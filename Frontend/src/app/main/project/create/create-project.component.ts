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
    templateUrl: './create-project.component.html',
    styleUrls: ['./create-project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CreateProjectComponent implements OnInit {

    project: Project;
    projectClient: Client;
    projectServices: Service[] = [];
    projectInvoices: Invoice[];

    savedServices: Service[] = [];

    savedClients: Client[] = [];

    pageType: string;

    fieldDisabled: boolean = false;
    projectForm: FormGroup;
    clientForm: FormGroup;
    servicesForm: FormGroup;

    invoicesForm: FormGroup;
    showClientForm: Boolean = false;

    showServicesForm: Boolean = false;

    displayedColumnsServices = ['serviceName', 'serviceTaxRate', 'price'];
    displayedColumnsInvoices = ['invoiceNumber', 'invoiceDate', 'invoiceTotalDue'];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _projectService: ProjectService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    ) {

        this.getClients();
        this.getServices();
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

        // this._projectService.getProject().then((project) => this.project = new )
        // Subscribe to update details on changes
        // this._projectService.onProjectChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((project: Project) => {
                // if (project) {
                //     this.project = new Project(project);
                //     this.projectClient = new Client(project.client);
                //     this.projectInvoices = project.invoices;
                //     this.showClientForm = true;
                //     this.showServicesForm = true;
                //     this.pageType = 'edit';
                // } else {
                    this.project = new Project(null);
                    this.projectClient = new Client(null);
                    this.pageType = 'new';
                // }

                this.projectForm = this.createProjectForm();
                this.clientForm = this.createClientForm();
                this.servicesForm = this.createServicesForm();
                this.invoicesForm = this.createInvoicesForm();
            // });
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
        this.fieldDisabled = !(this.pageType === 'new');
        return this._formBuilder.group({
            id: [this.projectClient.id],
            companyName: [{value: this.projectClient.companyName, disabled: this.fieldDisabled}, Validators.required],
            address: [{value: this.projectClient.address, disabled: this.fieldDisabled}, Validators.required],
            website: [{value: this.projectClient.website, disabled: this.fieldDisabled}, Validators.required],
            email: [{value: this.projectClient.email, disabled: this.fieldDisabled}, Validators.email],
            phoneNumber: [{value: this.projectClient.phoneNumber, disabled: this.fieldDisabled}, Validators.min(9)],
            secondPhoneNumber: [
                {value: this.projectClient.secondPhoneNumber, disabled: this.fieldDisabled},
                Validators.required,
            ],
            client: [this.projectClient],
        });
    }

    private createServicesForm() {
        return this._formBuilder.group({
            service: ['', Validators.required]
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

    async getClients() {
        this.savedClients = await this._projectService.getSavedClients();
    }

    async getServices() {
        this.savedServices = await this._projectService.getSavedServices();
    }

    populateClient(e) {
        this.projectClient = this.savedClients.filter((x) => x.companyName === e)[0];
        this.clientForm = this.createClientForm();
        this.showClientForm = true;
    }

    addService(e) {
        let service = this.savedServices.filter((x) => x.serviceName === e.value)[0];
        if (this.projectServices.indexOf(service) == -1) {
            this.projectServices.push(service);
        }
        this.showServicesForm = true;
    }

    getTotalDue() {
        let total = 0.0;
        this.projectServices.forEach((service) => {
            total += (service.price * ((service.taxRate / 100) + 1));
        });
        return total;
    }

    finishForm() {
        const data = this.projectForm.getRawValue();
        let p = new Project(data);

        let clientData = this.clientForm.getRawValue();
        p.client = new Client(clientData);

        p.services = this.projectServices;

        // Set the Total Due in the project info
        p.totalDue = this.getTotalDue();
        p.remainingPayment = this.getTotalDue();

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
}
