import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class InvoiceService implements Resolve<any> {
    routeParams: any;
    invoice: any;
    onInvoiceChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient, private router: Router) {
        // Set the defaults
        this.onInvoiceChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        if (this.routeParams.invoiceNumber == "create")
            this.router.navigateByUrl("main/invoices/create");

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getInvoice()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get details
     *
     * @returns {Promise<any>}
     */
    getInvoice(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    "/vbs-invoice-system/resources/invoices/" +
                        this.routeParams.invoiceNumber
                )
                .subscribe((response: any) => {
                    this.invoice = response;
                    this.onInvoiceChanged.next(this.invoice);
                    resolve(response);
                }, reject);
        });
    }

    saveInvoice(invoice): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(
                    "/vbs-invoice-system/resources/invoices" +
                        invoice.invoiceNumber,
                    invoice
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addInvoice(invoice): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post("/vbs-invoice-system/resources/invoices", invoice)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}