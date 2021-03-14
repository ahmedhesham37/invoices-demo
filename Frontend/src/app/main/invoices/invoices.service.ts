import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class InvoicesService implements Resolve<any>
{
    invoices: any[];
    onOrdersChanged: BehaviorSubject<any>;

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
        this.onOrdersChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getOrders()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get invoices
     *
     * @returns {Promise<any>}
     */
    getOrders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('/vbs-invoice-system/resources/invoices')
                .subscribe((response: any) => {
                    this.invoices = response;
                    console.log(this.invoices);
                    
                    this.onOrdersChanged.next(this.invoices);
                    resolve(response);
                }, reject);
        });
    }
}
