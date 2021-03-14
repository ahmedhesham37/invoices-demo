import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";
import { FuseUtils } from "@fuse/utils";

import { InvoicesService } from "app/main/invoices/invoices.service";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "invoices",
    templateUrl: "./invoices.component.html",
    styleUrls: ["./invoices.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class InvoicesComponent implements OnInit, OnDestroy {
    dataSource: FilesDataSource | null;
    displayedColumns = [
        "id",
        "reference",
        "client",
        "total",
        // "payment",
        "status",
        "date",
        "duedate",
    ];

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    @ViewChild("filter", { static: true })
    filter: ElementRef;

    @ViewChild(MatSort, { static: true })
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InvoicesService} _invoicesService
     */
    constructor(private _invoicesService: InvoicesService) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.dataSource = new FilesDataSource(
            this._invoicesService,
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

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}

export class FilesDataSource extends DataSource<any> {
    // Private
    private _filterChange = new BehaviorSubject("");
    private _filteredDataChange = new BehaviorSubject("");

    /**
     * Constructor
     *
     * @param {InvoicesService} _invoicesService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _invoicesService: InvoicesService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._invoicesService.invoices;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._invoicesService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange,
        ];

        return merge(...displayDataChanges).pipe(
            map(() => {
                let data = this._invoicesService.invoices.slice();

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

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any {
        if (!this.filter) {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === "") {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = "";
            let propertyB: number | string = "";

            switch (this._matSort.active) {
                case "id":
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case "reference":
                    [propertyA, propertyB] = [a.invoiceNumber, b.invoiceNumber];
                    break;
                    case "client":
                        [propertyA, propertyB] = [
                            a.clients[0].companyName,
                            b.clients[0].companyName,
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
                case "dueDate":
                    [propertyA, propertyB] = [a.dueDate, b.dueDate];
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

    /**
     * Disconnect
     */
    disconnect(): void {}
}
