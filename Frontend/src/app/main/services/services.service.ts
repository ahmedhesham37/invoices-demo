import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ServicesService implements Resolve<any> {
    products: any[];
    onServicesChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onServicesChanged = new BehaviorSubject({});
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
            Promise.all([this.getServices()]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get services
     *
     * @returns {Promise<any>}
     */
    getServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/services")
                .subscribe((response: any) => {
                    this.products = response;
                    this.onServicesChanged.next(this.products);
                    resolve(response);
                }, reject);
        });
    }
}
