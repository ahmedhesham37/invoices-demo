import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {InvoicesService} from '../invoices/invoices.service';
import {ProjectsService} from './projects.service';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {FuseUtils} from '../../../@fuse/utils';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
    dataSource: FilesDataSource | null;
    displayedColumns = [
        'invoiceNumber',
        'client',
        'total',
        // "payment",
        'status',
        'date',
    ];

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    @ViewChild("filter", { static: true })
    filter: ElementRef;

    @ViewChild(MatSort, { static: true })
    sort: MatSort;

    private _unsubscribeAll: Subject<any>;

    constructor(private _projectsService: ProjectsService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(
            this._projectsService,
            this.paginator,
            this.sort
        );

        fromEvent(this.filter.nativeElement, "keyup")
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}


export class FilesDataSource extends DataSource<any> {
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    constructor(
        private _projectsService: ProjectsService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._projectsService.projects;
    }

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._projectsService.onProjectsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange,
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this._projectsService.projects.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex =
                    this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );
    }

    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === "") {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSort.active) {
                case "invoiceNumber":
                    [propertyA, propertyB] = [a.invoiceNumber, b.invoiceNumber];
                    break;
                case "client":
                    [propertyA, propertyB] = [
                        a.client.companyName,
                        b.client.companyName,
                    ];
                    break;
                case "total":
                    [propertyA, propertyB] = [a.totalDue, b.totalDue];
                    break;
                // case "payment":
                //     [propertyA, propertyB] = [
                //         a.payment.method,
                //         b.payment.method,
                //     ];
                //     break;
                // case "status":
                //     [propertyA, propertyB] = [
                //         a.status[0].name,
                //         b.status[0].name,
                //     ];
                //     break;
                case "invoiceDate":
                    [propertyA, propertyB] = [a.invoiceDate, b.invoiceDate];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (
                (valueA < valueB ? -1 : 1) *
                (this._matSort.direction === "asc" ? 1 : -1)
            );
        });
    }

    disconnect(): void {}
}
