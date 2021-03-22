import { Invoice } from "app/main/invoice/details/invoice.model";
import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ShowInvoiceService } from "app/main/invoice/show-invoice/show-invoice.service";
import {getLocaleDateFormat} from '@angular/common';
import {Project} from '../../../project/create/project.model';
import {Client} from '../../details/client.model';
import {Service} from '../../../service/details/service.model';

@Component({
    selector: "invoice-modern",
    templateUrl: "./show-invoice.component.html",
    styleUrls: ["./show-invoice.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class InvoiceModernComponent implements OnInit, OnDestroy {
    invoice: Invoice = new Invoice(null);
    project: Project = new Project(null);
    client: Client = new Client(null);
    services : Service[] = [];

    private _unsubscribeAll: Subject<any>;

    constructor(private _invoiceService: ShowInvoiceService) {
        this._unsubscribeAll = new Subject();
        this.getProjectDetails();
    }

    ngOnInit(): void {

        this._invoiceService.invoiceOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((invoice) => {
                console.log("show invoice >> " , invoice);
                this.invoice = new Invoice(invoice);
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    async getProjectDetails(){
        this.project = await this._invoiceService.getProject();
        this.client = this.project.client;
        this.services = this.project.services;
        console.log("project details " , this.project , this.client , this.services);
    }
}
