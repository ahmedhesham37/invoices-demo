import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";

import { fuseAnimations } from "@fuse/animations";

import { Invoice } from "app/main/invoice/details/invoice.model";
import { InvoiceService } from "app/main/invoice/details/invoice.service";
import {Project} from '../../project/create/project.model';
import {Client} from './client.model';
import {Service} from '../../service/details/service.model';

@Component({
    selector: "invoice",
    templateUrl: "./invoice.component.html",
    styleUrls: ["./invoice.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class InvoiceComponent implements OnInit, OnDestroy {
    invoice: Invoice = new Invoice(null);
    project: Project = new Project(null);
    client: Client = new Client(null);
    services: Service[] = [];

    invoiceForm: FormGroup;

    loading: Boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _invoiceService: InvoiceService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _location: Location
    ) {
        // Set the defaults
        this.getProjectDetails();
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update details on changes
        this._invoiceService.onInvoiceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((invoice) => {
                if (invoice) {
                    this.invoice = new Invoice(invoice);
                }
                this.invoiceForm = this.createInvoiceForm();
                this.loading = true;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createInvoiceForm(): FormGroup {
        return this._formBuilder.group({
            invoiceNumber: [this.invoice.invoiceNumber],
            description: [this.invoice.description],
            priceTaxExcl: [this.invoice.price],
            priceTaxIncl: [this.invoice.totalDue],
            clientCompanyName: [this.invoice.client.companyName],
            clientEmail: [this.invoice.client.email],
            clientPhoneNumber: [this.invoice.client.phoneNumber],
            clientAddress: [this.invoice.client.address],
            services: [this.invoice.services],
        });
    }

    async getProjectDetails(){
        this.project = await this._invoiceService.getProject();
        this.client = this.project.client;
        this.services = this.project.services;
    }
}
