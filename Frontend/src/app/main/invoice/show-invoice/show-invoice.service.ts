import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {Invoice} from '../details/invoice.model';

@Injectable()
export class ShowInvoiceService implements Resolve<any> {
    invoice: any;
    invoiceOnChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.invoiceOnChanged = new BehaviorSubject({});
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
            Promise.all([this.getInvoice(route.params.invoiceNumber)]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getInvoice(invoiceNumber): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/invoices/" + invoiceNumber)
                .subscribe((invoice: Invoice) => {
                    this.invoice = invoice;
                    this.invoiceOnChanged.next(this.invoice);
                    resolve(this.invoice);
                }, reject);
        });
    }
}
