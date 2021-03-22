import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

    projects: any[];
    onProjectsChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient) {
        this.onProjectsChanged = new BehaviorSubject({});
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
            Promise.all([this.getProjects()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getProjects(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get("/vbs-invoice-system/resources/projects")
                .subscribe((response: any) => {
                    this.projects = response;
                    console.log("projects " , this.projects);
                    this.onProjectsChanged.next(this.projects);
                    resolve(response);
                }, reject);
        });
    }
}
