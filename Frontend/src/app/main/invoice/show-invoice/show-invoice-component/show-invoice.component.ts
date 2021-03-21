import { Invoice } from "app/main/invoice/details/invoice.model";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ShowInvoiceService } from "app/main/invoice/show-invoice/show-invoice.service";
import {getLocaleDateFormat} from '@angular/common';

@Component({
    selector: "invoice-modern",
    templateUrl: "./show-invoice.component.html",
    styleUrls: ["./show-invoice.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class InvoiceModernComponent implements OnInit, OnDestroy {
    invoice: Invoice;
    private _unsubscribeAll: Subject<any>;

    constructor(private _invoiceService: ShowInvoiceService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._invoiceService.invoiceOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((invoice) => {
                this.invoice = new Invoice(invoice);
                // let x = invoice.invoiceDate.replace("[UTC]" , "");
                // console.log(Date.parse(x));
                // console.log(x.getUTCDate());
                // console.log(x.getTimezoneOffset());
                // console.log(x.getTime());


                // console.log(invoice.invoiceDate , typeof invoice.invoiceDate , invoice.invoiceDate instanceof Object );
                // let d = new Date(Date.parse(invoice.invoiceDate);
                // let d = new Date(this.invoice.invoiceDate);
                // console.log('d' , d);
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
