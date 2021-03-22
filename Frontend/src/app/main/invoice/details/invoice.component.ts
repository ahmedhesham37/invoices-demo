import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";

import { fuseAnimations } from "@fuse/animations";

import { Invoice } from "app/main/invoice/details/invoice.model";
import { InvoiceService } from "app/main/invoice/details/invoice.service";

@Component({
    selector: "invoice",
    templateUrl: "./invoice.component.html",
    styleUrls: ["./invoice.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class InvoiceComponent implements OnInit, OnDestroy {
    invoice: Invoice;
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
        // this.invoice = new Invoice(null);
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

    // saveInvoice(): void {
    //     const data = this.invoiceForm.getRawValue();
    //
    //     this._invoiceService.saveInvoice(data).then(() => {
    //         // Trigger the subscription with new data
    //         this._invoiceService.onInvoiceChanged.next(data);
    //
    //         // Show the success message
    //         this._matSnackBar.open("Invoice saved", "OK", {
    //             verticalPosition: "top",
    //             duration: 3000,
    //         });
    //     });
    // }
    //
    // /**
    //  * Add Invoice
    //  */
    // addInvoice(): void {
    //     const data = this.invoiceForm.getRawValue();
    //
    //     this._invoiceService.addInvoice(data).then((invoice) => {
    //         // Trigger the subscription with new data
    //         this._invoiceService.onInvoiceChanged.next(data);
    //
    //         // Show the success message
    //         this._matSnackBar.open("Invoice added", "OK", {
    //             verticalPosition: "top",
    //             duration: 3000,
    //         });
    //
    //         // Change the location with new one
    //         this._location.go("main/invoices/" + invoice.id);
    //     });
    // }
}
