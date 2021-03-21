import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Project} from './project.model';
import {ProjectService} from './project.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {Client} from '../../invoice/details/client.model';
import {Service} from '../../service/details/service.model';
import {Invoice} from '../../invoice/details/invoice.model';
import {MatTable} from '@angular/material/table';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProjectComponent implements OnInit {

    project: Project;
    projectClient: Client;
    projectInvoices: Invoice[];

    savedClients: Client[] = [];

    pageType: string;
    fieldDisabled: boolean = false;

    projectForm: FormGroup;
    clientForm: FormGroup;
    invoicesForm: FormGroup;

    showClientForm: Boolean = false;
    showServicesForm: Boolean = false;

    displayedColumnsInvoices = ['invoiceNumber', 'invoiceDate', 'invoiceTotalDue', 'invoiceStatus'];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _projectService: ProjectService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    ) {
        this.getClients();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update details on changes
        this._projectService.onProjectChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((project: Project) => {
                if (project) {
                    this.project = new Project(project);
                    this.projectClient = new Client(project.client);
                    this.projectInvoices = project.invoices;
                    this.pageType = 'edit';
                } else {
                    this.project = new Project(null);
                    this.projectClient = new Client(null);
                    this.pageType = 'new';
                }

                this.projectForm = this.createProjectForm();
                this.clientForm = this.createClientForm();
                this.invoicesForm = this.createInvoicesForm();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createProjectForm(): FormGroup {
        this.fieldDisabled = !(this.pageType === 'new');
        return this._formBuilder.group({
            projectName: [{value: this.project.projectName, disabled: this.fieldDisabled}],
            projectNumber: [{value: this.project.projectNumber, disabled: this.fieldDisabled}],
            status: [{value: this.project.status, disabled: this.fieldDisabled}],
            totalDue: [{value: this.project.totalDue, disabled: this.fieldDisabled}],
            remainingPayment: [{value: this.project.remainingPayment, disabled: this.fieldDisabled}],
        });
    }

    createClientForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.projectClient.id,],
            companyName: [this.projectClient.companyName, Validators.required],
            address: [this.projectClient.address, Validators.required],
            website: [this.projectClient.website, Validators.required],
            email: [this.projectClient.email, Validators.email],
            phoneNumber: [this.projectClient.phoneNumber, Validators.min(9)],
            secondPhoneNumber: [
                this.projectClient.secondPhoneNumber,
                Validators.required,
            ],
            client: [this.projectClient],
        });
    }

    createInvoicesForm(): FormGroup {
        return this._formBuilder.group({
            invoice: ['', Validators.required]
        });
    }


    saveProject(): void {
        const data = this.projectForm.getRawValue();
        let p = new Project(data);
        p.client = new Client(this.projectClient);

        console.log(
            'project data', p
        );
        this._projectService.saveProject(p).then(() => {
            // Trigger the subscription with new data
            this._projectService.onProjectChanged.next(data);

            // Show the success message
            this._matSnackBar.open('Project saved', 'OK', {
                verticalPosition: 'top',
                duration: 3000,
            });
            this.router.navigateByUrl('main/projects');
        });
    }

    addProject(): void {
        const data = this.projectForm.getRawValue();
        let p = new Project(data);

        let clientData = this.clientForm.getRawValue();
        p.client = new Client(clientData);

        this._projectService.addProject(p).then((project) => {
            // Trigger the subscription with new data
            this._projectService.onProjectChanged.next(data);

            this.project = new Project(project);
            // Show the success message
            this._matSnackBar.open('Project added', 'OK', {
                verticalPosition: 'top',
                duration: 3000,
            });

            this.router.navigateByUrl('main/projects');
        });
    }

    async getClients() {
        this.savedClients = await this._projectService.getSavedClients();
    }

    populateClient(e) {
        this.projectClient = this.savedClients.filter((x) => x.companyName === e)[0];
        this.clientForm = this.createClientForm();
        this.showClientForm = true;
    }
}
