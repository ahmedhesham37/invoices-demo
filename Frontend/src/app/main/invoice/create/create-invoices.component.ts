import {Router} from '@angular/router';
import {Service} from 'app/main/service/details/service.model';
import {CreateInvoiceService} from './create-invoice.service';
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Client} from 'app/main/invoice/details/client.model';
import {Invoice} from '../details/invoice.model';
import {MatTable} from '@angular/material/table';
import {fuseAnimations} from '../../../../@fuse/animations';
import {Project} from '../../project/create/project.model';

@Component({
    selector: 'forms',
    templateUrl: './create-invoices.component.html',
    styleUrls: ['./create-invoices.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
    @ViewChild('servicesTable') servicesTable: MatTable<Service[]>;

    form: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    projectsForm: FormGroup;
    clientForm: FormGroup;
    servicesForm: FormGroup;
    invoicesForm: FormGroup;

    showClientForm: Boolean = false;
    showProjectsForm: Boolean = false;
    showServicesForm: Boolean = false;
    client: Client;
    project: Project;
    invoice: Invoice;
    savedClients: Client[];
    savedProjects: Project[];
    services: Service[];
    invoiceServices: Service[] = [];

    displayedColumns = ['serviceName', 'serviceDescription', 'price'];

    constructor(
        private _formBuilder: FormBuilder,
        private _createInvoiceService: CreateInvoiceService,
        private router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.client = new Client(null);
        this.project = new Project(null)
        this.invoice = new Invoice(null);
        this.invoice.invoiceDate = new Date();
        this.getServices();
        this.getProjects();
    }

    async ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.createProjectsForm();
        this.createServicesForm();
        this.createInvoiceForm();
    }

    createProjectsForm(){
        this.projectsForm = this._formBuilder.group({
            project: [this.project],
        });
    }


    createServicesForm(){
        this.servicesForm = this._formBuilder.group({
            service: ['', Validators.required],
        });
    }

    createInvoiceForm(){
        this.invoicesForm = this._formBuilder.group({
            invoiceDate: [{ value: this.invoice.invoiceDate , disabled : true} ],
            type: [this.invoice.type, [Validators.required]],
            totalDue: [{value : this.invoice.totalDue , disabled : true }],
            description: [this.invoice.description],
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    finishForm(): void {
        // Populating details data into the details object
        let data = this.invoicesForm.getRawValue();
        this.invoice = new Invoice(data);

        // Populating client data into the client object (whether new or saved)
        let clientData = this.clientForm.getRawValue();
        this.client = new Client(clientData);

        // Add the list chosen in Step 2 to the Main Invoice Object
        this.invoice.services = this.invoiceServices;

        // Add the client details (whether previous or new) chosen in Step 2 to the Main Invoice Object
        this.invoice.client = this.client;

        console.log('details ', this.invoice);

        this._createInvoiceService
            .addInvoice(this.invoice)
            .then((invoice: Invoice) =>
                this.router.navigateByUrl(
                    '/main/show-invoice/' + this.invoice.invoiceNumber
                )
            );
    }

    async getServices() {
        this.services = await this._createInvoiceService.getServices();
    }

    addService(e) {
        let service = this.services.filter((x) => x.serviceName === e.value)[0];
        if (this.invoiceServices.indexOf(service) == -1) {
            this.invoiceServices.push(service);
        }
        this.showServicesForm = true;
    }

    getTotalDue(){
        let total = 0.0;
        this.invoiceServices.forEach((service) => {
            total += (service.price * ((service.taxRate / 100) + 1));
        });
        this.invoicesForm.controls.totalDue.setValue(total);
    }

    private async getProjects() {
        this.savedProjects = await this._createInvoiceService.getProjects();
    }

    populateProjectDetails(e) {
        this.project = this.savedProjects.filter((x) => x.projectName === e)[0];
        this.createProjectsForm();
        this.showProjectsForm = true;
    }
}
