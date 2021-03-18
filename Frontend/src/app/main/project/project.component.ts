import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Project} from './project.model';
import {ProjectService} from './project.service';
import {fuseAnimations} from '../../../@fuse/animations';
import {Client} from '../invoice/client.model';
import {Service} from '../service/service.model';
import {Invoice} from '../invoice/invoice.model';
import {MatTable} from '@angular/material/table';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProjectComponent implements OnInit {

    @ViewChild('servicesTable') servicesTable: MatTable<Service[]>;


    project: Project;
    client: Client;
    projectServices: Service[];
    invoices: Invoice[];
    savedClients: Client[] = [];
    savedServices: Service[] = [];

    pageType: string;
    projectForm: FormGroup;
    clientForm: FormGroup;
    servicesForm: FormGroup;
    invoicesForm: FormGroup;

    showClientForm: Boolean = false;
    showServicesForm: Boolean = false;

    displayedColumns = ['serviceName', 'serviceDescription', 'price'];

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _projectService: ProjectService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router: Router
    ) {
        this.project = new Project(null);
        this.client = new Client(null);
        this.getClients();
        this.getSavedServices();

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update project on changes
        this._projectService.onProjectChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((project) => {
                if (project) {
                    this.project = new Project(project);
                    this.client = new Client(null);
                    this.pageType = 'edit';
                } else {
                    this.project = new Project(null);
                    this.client = new Client(null);
                    this.pageType = 'new';
                }

                this.projectForm = this.createProjectForm();
                this.clientForm = this.createClientForm();
                this.servicesForm = this.createServicesForm()
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createProjectForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.project.id],
            projectName: [this.project.projectName],
            projectNumber: [this.project.projectNumber],
            status: [this.project.status],
            totalDue: [this.project.totalDue],
            remainingPayment: [this.project.remainingPayment],

            // Client Form

            // Services Form

            // Invoices Form
        });
    }

    createClientForm(): FormGroup {
        return this._formBuilder.group({
            companyName: [this.client.companyName, Validators.required],
            address: [this.client.address, Validators.required],
            website: [this.client.website, Validators.required],
            email: [this.client.email, Validators.email],
            phoneNumber: [this.client.phoneNumber, Validators.min(9)],
            secondPhoneNumber: [
                this.client.secondPhoneNumber,
                Validators.required,
            ],
            client: [this.client],
        });
    }

    createServicesForm(): FormGroup {
        return this._formBuilder.group({
           service: ['' , Validators.required]
        });
    }

    saveProject(): void {
        const data = this.projectForm.getRawValue();
        this._projectService.saveProject(data).then(() => {
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

        this._projectService.addProject(data).then((project) => {
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

    async getSavedServices() {
        this.savedServices = await this._projectService.getServices();
    }

    populateClient(e) {
        this.client = this.savedClients.filter((x) => x.companyName === e)[0];
        this.clientForm = this.createClientForm();
        this.showClientForm = true;
    }
    addServiceToProject(e){
        let service = this.savedServices.filter((x) => x.serviceName === e.value)[0];
        if (!this.projectServices)
            this.projectServices = [];
        if (this.projectServices.indexOf(service) == -1) {
            this.projectServices.push(service);
            console.log(this.projectServices);
        }
        this.showServicesForm = true;

    }
}
