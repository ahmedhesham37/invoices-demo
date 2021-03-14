import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { Client } from "../../models/Client";

@Component({
    selector: "forms",
    templateUrl: "./create-invoices.component.html",
    styleUrls: ["./create-invoices.component.scss"],
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
    form: FormGroup;

    // Horizontal Stepper
    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    FormStep1: FormGroup;
    FormStep2: FormGroup;
    FormStep3: FormGroup;

    registeredClient: any;
    public userProfile: KeycloakProfile | null = null;

    constructor(
        private _formBuilder: FormBuilder,
        private keycloak: KeycloakService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    async isLogged() {
        let loggedin = await this.keycloak.isLoggedIn();
        console.log(loggedin);
    }
    async ngOnInit() {
        this.isLogged();
        let registeredUser = this.registeredClient;
        this.FormStep1 = this._formBuilder.group({
            clientName: ["", Validators.required],
            clientCompany: ["", Validators.required],
            clientAddress: ["", Validators.required],
            clientWebsite: ["", Validators.required],
            clientEmail: ["", Validators.email],
            clientPhoneNumber: ["", Validators.min(9)],
            clientOtherPhoneNumber: ["", Validators.required],
            registeredClient: [""],
        });

        this.FormStep2 = this._formBuilder.group({
            address: ["", Validators.required],
        });

        this.FormStep3 = this._formBuilder.group({
            city: ["", Validators.required],
            state: ["", Validators.required],
            postalCode: ["", [Validators.required, Validators.maxLength(5)]],
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    finishForm(): void {
        alert("You have finished the horizontal stepper!");
    }
}
