import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { Invoice } from "../details/invoice.model";

@Injectable()
export class CreateInvoiceService implements Resolve<any> {
    invoice: Invoice;
    onInvoiceChanged: BehaviorSubject<any>;


    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onInvoiceChanged = new BehaviorSubject({});
    }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        // return new Promise<void>((resolve, reject) => {
        // Promise.all([this.getProjects()]).then(() => {
        // resolve();
        // }, reject);
        // });
    }


    addInvoice(invoice : Invoice, projectNumber: String): Promise<any> {
        return new Promise((resolve, reject) => {
            const request = {
                description: invoice.description,
                invoiceDate: invoice.invoiceDate,
                totalDue: invoice.totalDue
            };

            this._httpClient
                .post("/vbs-invoice-system/resources/projects/" + projectNumber + "/add-invoice", request)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }


    getProjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/projects")
                .subscribe((response: any) => {
                    console.log(response);
                    resolve(response);
                }, reject);
        });
    }
}
