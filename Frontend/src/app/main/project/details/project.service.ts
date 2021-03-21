import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Project} from './project.model';
import {Service} from '../../service/details/service.model';
import {Client} from '../../invoice/details/client.model';

@Injectable({
    providedIn: 'root',
})
export class ProjectService implements Resolve<any> {
    routeParams: any;
    project: Project;
    onProjectChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private router: Router) {
        // Set the defaults
        this.onProjectChanged = new BehaviorSubject({});
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
        this.routeParams = route.params;
        console.log(this.routeParams);

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getProject()]).then(() => {
                resolve();
            }, reject);
        });

    }

    getProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.routeParams.projectNumber === 'new') {
                this.onProjectChanged.next(false);
                resolve(false);
            } else {
                return new Promise((resolve, reject) => {
                    this._httpClient
                        .get(
                            '/vbs-invoice-system/resources/projects/' +
                            this.routeParams.projectNumber
                        )
                        .subscribe((response: Project) => {
                            console.log(response);
                            this.project = response;
                            this.onProjectChanged.next(this.project);
                            resolve(response);
                        }, reject);
                });
            }
        });
    }

    saveProject(project): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post(
                    '/vbs-invoice-system/resources/projects' +
                    project.projectNumber,
                    project
                )
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    addProject(project): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .post('/vbs-invoice-system/resources/projects', project)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getClient() {
        return this.project.client;
    }

    getSavedClients(): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get('/vbs-invoice-system/resources/clients')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getServices(): Promise<Service[]> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get('/vbs-invoice-system/resources/services')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getInvoices() {
        return this.project.invoices;
    }
}
