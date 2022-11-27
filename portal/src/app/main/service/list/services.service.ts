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
    services: any[];
    onServicesChanged: BehaviorSubject<any>;


    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.onServicesChanged = new BehaviorSubject({});
    }


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

    getServices(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/services")
                .subscribe((response: any) => {
                    this.services = response;
                    this.onServicesChanged.next(this.services);
                    resolve(response);
                }, reject);
        });
    }
}
