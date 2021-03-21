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
    showServicesForm: Boolean = false;
    client: Client;
    invoice: Invoice;
    savedClients: Client[];
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
        this.invoice = new Invoice(null);
        this.invoice.invoiceDate = new Date();
        this.getClients();
        this.getServices();
    }

    async ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.createProjectsForm();
        this.createClientForm();
        this.createServicesForm();
        this.createInvoiceForm();
    }

    createProjectsForm(){
        this.projectsForm = this._formBuilder.group({
            projects: [this.client],
        });
    }

    createClientForm(){
        this.clientForm = this._formBuilder.group({
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

    async getClients() {
        this.savedClients = await this._createInvoiceService.getSavedClients();
    }

    async getServices() {
        this.services = await this._createInvoiceService.getServices();
    }

    populateClient(e) {
        this.client = this.savedClients.filter((x) => x.companyName === e)[0];
        this.createForm();
        this.showClientForm = true;
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
}
