import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {takeUntil} from 'rxjs/operators';
import {Location} from '@angular/common';

import {fuseAnimations} from '@fuse/animations';

import {Service} from 'app/main/service/service.model';
import {ServiceService} from 'app/main/service/service.service';

@Component({
    selector: 'service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ServiceComponent implements OnInit, OnDestroy {
    service: any;
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
        private _matSnackBar: MatSnackBar
    ) {
        // Set the default
        this.service = new Service();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to update service on changes
        this._serviceService.onServiceChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(service => {
                console.log('changed', service);
                if (service) {
                    // this.service = new Service(service);
                    this.service = service;
                    this.pageType = 'edit';
                } else {
                    this.pageType = 'new';
                    this.service = new Service();
                }

                this.serviceForm = this.createServiceForm();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create service form
     *
     * @returns {FormGroup}
     */
    createServiceForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.service.id],
            name: [this.service.serviceName],
            description: [this.service.description],
            images: [this.service.images],
            priceTaxExcl: [this.service.unitPrice],
            priceTaxIncl: [this.service.totalDue],
            taxRate: [this.service.taxRate],
            active: [this.service.active]
        });
    }

    /**
     * Save service
     */
    saveService(): void {
        const data = this.serviceForm.getRawValue();

        this._serviceService.saveService(data)
            .then(() => {

                // Trigger the subscription with new data
                this._serviceService.onServiceChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Service saved', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });
            });
    }

    /**
     * Add service
     */
    addService(): void {
        const data = this.serviceForm.getRawValue();

        this._serviceService.addService(data)
            .then(() => {

                // Trigger the subscription with new data
                this._serviceService.onServiceChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Service added', 'OK', {
                    verticalPosition: 'top',
                    duration: 3000
                });

                // Change the location with new one
                this._location.go('main/services/' + this.service.id);
            });
    }
}