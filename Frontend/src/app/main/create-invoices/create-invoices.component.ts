import {Router} from '@angular/router';
import {Service} from 'app/main/service/service.model';
import {CreateInvoiceService} from './create-invoice.service';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Client} from 'app/main/invoice/client.model';
import {Invoice} from '../invoice/invoice.model';
import {MatTable} from '@angular/material/table';

@Component({
    selector: 'forms',
    templateUrl: './create-invoices.component.html',
    styleUrls: ['./create-invoices.component.scss'],
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
    @ViewChild('servicesTable') servicesTable: MatTable<Service[]>;

    form: FormGroup;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    FormStep1: FormGroup;
    FormStep2: FormGroup;
    FormStep3: FormGroup;

    showClientForm: Boolean = false;
    showServicesForm: Boolean = false;
    client: Client;
    invoice: Invoice;
    savedClients: Client[];
    services: Service[];
    invoiceServices: Service[] = [];

    displayedColumns = ['serviceName', 'serviceDescription', 'totalPrice'];

    constructor(
        private _formBuilder: FormBuilder,
        private _createInvoiceService: CreateInvoiceService,
        private router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.client = new Client(null);
        this.invoice = new Invoice(null);
        this.getClients();
        this.getServices();
    }

    async ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.FormStep1 = this._formBuilder.group({
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

        this.FormStep2 = this._formBuilder.group({
            service: ['', Validators.required],
        });

        this.FormStep3 = this._formBuilder.group({
            // Invoice Number shoud be created here
            // this.client.companyName.substring(0,2).toUpperCase() + this.invoice.invoiceNumber
            invoiceNumber: [this.invoice.invoiceNumber, Validators.required],
            invoiceDate: [{ value: this.invoice.invoiceDate , disabled : true} ],
            type: [this.invoice.type, [Validators.required]],
            totalDue: [this.invoice.totalDue, [Validators.required]],
            description: [this.invoice.description, [Validators.required]],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    finishForm(): void {
        // Populating invoice data into the invoice object
        let data = this.FormStep3.getRawValue();
        this.invoice = new Invoice(data);

        // Populating client data into the client object (whether new or saved)
        let clientData = this.FormStep1.getRawValue();
        this.client = new Client(clientData);

        // Add the services chosen in Step 2 to the Main Invoice Object
        this.invoice.services = this.invoiceServices;

        // Add the client details (whether previous or new) chosen in Step 2 to the Main Invoice Object
        this.invoice.client = this.client;

        this.invoice.invoiceStatus = 'STARTED';
        console.log('invoice ', this.invoice);

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
}
