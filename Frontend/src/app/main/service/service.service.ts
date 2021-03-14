import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ServiceService implements Resolve<any>
{
    routeParams: any;
    service: any;
    onServiceChanged: BehaviorSubject<any>;

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
        this.onServiceChanged = new BehaviorSubject({});
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
        console.log('route params' , this.routeParams);
        
        this.routeParams = route.params;

        return new Promise<void>((resolve, reject) => {

            Promise.all([
                this.getService()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get service
     *
     * @returns {Promise<any>}
     */
    getService(): Promise<any>
    {

        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onServiceChanged.next(false);
                resolve(false);
            }
            else
            {
                console.log('changed' , this.routeParams.id);
                 
                this._httpClient.get('/vbs-invoice-system/resources/services/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        console.log(response);
                        
                        this.service = response;
                        this.onServiceChanged.next(this.service);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save service
     *
     * @param updatedService
     * @returns {Promise<any>}
     */
    saveService(updatedService): Promise<any>
    {
        let service = { 
            "id" : updatedService.id,
            "serviceName" : updatedService.name,
            "description" : updatedService.description,
            "unit" : updatedService.unit,
            "unitPrice" : parseFloat(updatedService.priceTaxExcl),
            "currency" : updatedService.currency || 'USD',
            "quantity" : parseFloat(updatedService.quantity),
            "totalDue" : parseFloat(updatedService.priceTaxIncl)
//  Long id;
//  double unitPrice;
//  double quantity;
//  double totalDue;
        }
        return new Promise((resolve, reject) => {
            this._httpClient.post('/vbs-invoice-system/resources/services/', service)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add service
     *
     * @param newService
     * @returns {Promise<any>}
     */
    addService(newService): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let service = { 
                "serviceName" : newService.name,
                "description" : newService.description,
                "unit" : newService.unit,
                "unitPrice" : parseFloat(newService.priceTaxExcl),
                "currency" : newService.currency || 'USD',
                "quantity" : parseFloat(newService.quantity),
                "totalDue" : parseFloat(newService.priceTaxIncl)
    //  Long id;
    //  double unitPrice;
    //  double quantity;
    //  double totalDue;
            }
            this._httpClient.post('/vbs-invoice-system/resources/services', service)
                .subscribe((response: any) => {
                    console.log("Added new Service with id >> " , response.id);
                    
                    console.log(response);
                    
                    resolve(response);
                }, reject);
        });
    }
}
