import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";

import { fuseAnimations } from "@fuse/animations";

import { Invoice } from "app/main/invoice/details/invoice.model";
import { InvoiceService } from "app/main/invoice/details/invoice.service";
import {Project} from '../create/project.model';
import {ProjectDetailsService} from './project-details.service';

@Component({
    selector: "project",
    templateUrl: "./project-details.component.html",
    styleUrls: ["./project-details.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
    project: Project;
    projectForm: FormGroup;
    loading: Boolean = false;

    // Private
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _projectService: ProjectDetailsService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _location: Location
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update details on changes
        this._projectService.onProjectChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((project) => {
                if (project) {
                    console.log(project);
                    this.project = new Project(project);
                }
                console.log("hello");
                this.projectForm = this.createProjectForm();
                this.loading = true;
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createProjectForm(): FormGroup {
        return this._formBuilder.group({
            projectName: [this.project.projectName],
            projectNumber: [this.project.projectNumber],
            status: [this.project.status],
            remainingPayment: [this.project.remainingPayment],
            totalDue: [this.project.totalDue],
            client: [this.project.client],
            services: [this.project.services],
            invoices: [this.project.invoices],
        });
    }

}
