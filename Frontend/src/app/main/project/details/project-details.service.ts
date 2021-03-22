import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import {Project} from '../create/project.model';

@Injectable()
export class ProjectDetailsService implements Resolve<any> {
    routeParams: any;
    project: Project;
    onProjectChanged: BehaviorSubject<any>;

    constructor(private _httpClient: HttpClient, private router: Router) {
        // Set the defaults
        this.onProjectChanged = new BehaviorSubject({});
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;
        console.log(this.routeParams);
        if (this.routeParams.projectNumber === "create")
            this.router.navigateByUrl("main/projects/create");

        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getProject()]).then(() => {
                resolve();
            }, reject);
        });
    }

    getProject(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    "/vbs-invoice-system/resources/projects/" +
                        this.routeParams.projectNumber
                )
                .subscribe((project: Project) => {
                    this.project = project;
                    this.onProjectChanged.next(this.project);
                    resolve(project);
                }, reject);
        });
    }

}
