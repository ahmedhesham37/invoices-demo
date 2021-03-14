import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class InvoiceService implements Resolve<any>
{
    routeParams: any;
    invoice: any;
    onInvoiceChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getInvoice()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get invoice
     *
     * @returns {Promise<any>}
     */
    getInvoice(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('/vbs-invoice-system/resources/invoices/' + this.routeParams.id)
                .subscribe((response: any) => {
                    this.invoice = response;
                    console.log("invoice in invoice service ?? getInvoice() " , response);
                    this.onInvoiceChanged.next(this.invoice);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Save invoice
     *
     * @param invoice
     * @returns {Promise<any>}
     */
    saveInvoice(invoice): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('/vbs-invoice-system/resources/invoices' + invoice.id, invoice)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add invoice
     *
     * @param invoice
     * @returns {Promise<any>}
     */
    addInvoice(invoice): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.post('/vbs-invoice-system/resources/invoices', invoice)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
