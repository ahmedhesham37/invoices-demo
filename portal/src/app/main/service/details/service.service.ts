import { Service } from "./service.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ServiceService implements Resolve<any> {
    routeParams: any;
    service: any;
    onServiceChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onServiceChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getService()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getService(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.id === "new") {
                this.onServiceChanged.next(false);
                resolve(false);
            } else {
                this._httpClient
                    .get(
                        "/vbs-invoice-system/resources/services/" +
                            this.routeParams.id
                    )
                    .subscribe((response: any) => {
                        this.service = response;
                        this.onServiceChanged.next(this.service);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save details
     *
     * @param updatedService
     * @returns {Promise<any>}
     */
    saveService(updatedService): Promise<any> {
        let service = new Service(updatedService);
        return new Promise((resolve, reject) => {
            this._httpClient
                .put(
                    "/vbs-invoice-system/resources/services/" + service.id,
                    service
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add details
     *
     * @param newService
     * @returns {Promise<any>}
     */
    addService(newService): Promise<any> {
        return new Promise((resolve, reject) => {
            let service = new Service(newService);
            this._httpClient
                .post("/vbs-invoice-system/resources/services", service)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
