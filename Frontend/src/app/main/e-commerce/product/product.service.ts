import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any>;

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
        this.onProductChanged = new BehaviorSubject({});
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
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any>
    {

        return new Promise((resolve, reject) => {
            if ( this.routeParams.id === 'new' )
            {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else
            {
                console.log('changed' , this.routeParams.id);
                 
                this._httpClient.get('http://localhost:8080/vbs-invoice-system/resources/services/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        console.log(response);
                        
                        this.product = response;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product): Promise<any>
    {
        let service = { 
            "id" : product.id,
            "serviceName" : product.name,
            "description" : product.description,
            "unit" : product.unit,
            "unitPrice" : parseFloat(product.priceTaxExcl),
            "currency" : product.currency || 'USD',
            "quantity" : parseFloat(product.quantity),
            "totalDue" : parseFloat(product.priceTaxIncl) 
//  Long id;
//  double unitPrice;
//  double quantity;
//  double totalDue;
        }
        return new Promise((resolve, reject) => {
            this._httpClient.post('http://localhost:8080/vbs-invoice-system/resources/services/', service)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product): Promise<any>
    {
        return new Promise((resolve, reject) => {
            let service = { 
                "serviceName" : product.name,
                "description" : product.description,
                "unit" : product.unit,
                "unitPrice" : parseFloat(product.priceTaxExcl),
                "currency" : product.currency || 'USD',
                "quantity" : parseFloat(product.quantity),
                "totalDue" : parseFloat(product.priceTaxIncl) 
    //  Long id;
    //  double unitPrice;
    //  double quantity;
    //  double totalDue;
            }
            this._httpClient.post('http://localhost:8080/vbs-invoice-system/resources/services', service)
                .subscribe((response: any) => {
                    console.log("Added new Product with id >> " , response.id);
                    
                    console.log(response);
                    
                    resolve(response);
                }, reject);
        });
    }
}
