import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class InvoicesService implements Resolve<any> {
    invoices: any[];
    onOrdersChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onOrdersChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getInvoices()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getInvoices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/invoices")
                .subscribe((response: any) => {
                    this.invoices = response;
                    this.onOrdersChanged.next(this.invoices);
                    resolve(response);
                }, reject);
        });
    }
}
