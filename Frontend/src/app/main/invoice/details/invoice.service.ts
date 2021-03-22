import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {Project} from '../../project/create/project.model';
import {Invoice} from './invoice.model';

@Injectable()
export class InvoiceService implements Resolve<any> {
    routeParams: any;
    invoice: Invoice;
    project: Project;
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

    getInvoice(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    "/vbs-invoice-system/resources/invoices/" +
                        this.routeParams.invoiceNumber
                )
                .subscribe((invoice: Invoice) => {
                    this.invoice = invoice;
                    this.onInvoiceChanged.next(this.invoice);
                    resolve(invoice);
                }, reject);
        });
    }

    getProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    "/vbs-invoice-system/resources/invoices/" +
                    this.routeParams.invoiceNumber + "/get-project-details"
                )
                .subscribe((project: Project) => {
                    this.invoice = project.invoices.filter((x) => x.invoiceNumber === this.routeParams.invoiceNumber)[0];
                    console.log("sad " , this.invoice);
                    this.project = project;
                    resolve(project);
                }, reject);
        });
    }
}
