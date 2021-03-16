import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

import { Invoice } from "../invoice/invoice.model";

@Injectable()
export class CreateInvoiceService implements Resolve<any> {
    invoice: Invoice;
    onInvoiceChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onInvoiceChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        // return new Promise<void>((resolve, reject) => {
        // Promise.all([this.getInvoice()]).then(() => {
        // resolve();
        // }, reject);
        // });
    }

    /**
     * Add invoice
     *
     * @param invoice
     * @returns {Promise<any>}
     */
    addInvoice(invoice): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("/vbs-invoice-system/resources/invoices", invoice)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get clients
     *
     * @returns {Promise<any>}
     */
    getSavedClients(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/clients")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get clients
     *
     * @returns {Promise<any>}
     */
    getServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/services")
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
