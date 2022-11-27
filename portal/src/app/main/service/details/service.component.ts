import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { takeUntil } from "rxjs/operators";
import { Location } from "@angular/common";

import { fuseAnimations } from "@fuse/animations";

import { Service } from "app/main/service/details/service.model";
import { ServiceService } from "app/main/service/details/service.service";
import {Router} from '@angular/router';

@Component({
    selector: "service",
    templateUrl: "./service.component.html",
    styleUrls: ["./service.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ServiceComponent implements OnInit, OnDestroy {
    service: Service;
    pageType: string;
    serviceForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ServiceService} _serviceService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _serviceService: ServiceService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private router : Router
    ) {
        // Set the default
        this.service = new Service(null);

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        // Subscribe to update details on changes
        this._serviceService.onServiceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((service) => {
                if (service) {
                    this.service = new Service(service);
                    this.pageType = "edit";
                } else {
                    this.service = new Service(null);
                    this.pageType = "new";
                }

                this.serviceForm = this.createServiceForm();
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createServiceForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.service.id],
            serviceName: [this.service.serviceName],
            description: [this.service.description],
            price: [this.service.price],
            taxRate: [this.service.taxRate],
        });
    }

    saveService(): void {
        const data = this.serviceForm.getRawValue();
        this._serviceService.saveService(data).then(() => {
            // Trigger the subscription with new data
            this._serviceService.onServiceChanged.next(data);

            // Show the success message
            this._matSnackBar.open("Service saved", "OK", {
                verticalPosition: "top",
                duration: 3000,
            });
            this.router.navigateByUrl("main/services");
        });
    }

    addService(): void {
        const data = this.serviceForm.getRawValue();

        this._serviceService.addService(data).then((service) => {
            // Trigger the subscription with new data
            this._serviceService.onServiceChanged.next(data);

            this.service = new Service(service);
            // Show the success message
            this._matSnackBar.open("Service added", "OK", {
                verticalPosition: "top",
                duration: 3000,
            });

            this.router.navigateByUrl("main/services");
        });
    }
}