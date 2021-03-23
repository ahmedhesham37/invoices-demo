import {Router} from '@angular/router';
import {Service} from 'app/main/service/details/service.model';
import {CreateInvoiceService} from './create-invoice.service';
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Client} from 'app/main/invoice/details/client.model';
import {Invoice} from '../details/invoice.model';
import {MatTable} from '@angular/material/table';
import {fuseAnimations} from '../../../../@fuse/animations';
import {Project} from '../../project/create/project.model';

@Component({
    selector: 'forms',
    templateUrl: './create-invoices.component.html',
    styleUrls: ['./create-invoices.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CreateInvoicesComponent implements OnInit, OnDestroy {
    @ViewChild('servicesTable') servicesTable: MatTable<Service[]>;

    form: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;
    projectsForm: FormGroup;
    clientForm: FormGroup;
    servicesForm: FormGroup;
    invoicesForm: FormGroup;

    showClientForm: Boolean = false;
    showProjectsForm: Boolean = false;
    showServicesForm: Boolean = false;
    client: Client;
    project: Project;
    invoice: Invoice;
    savedProjects: Project[];
    services: Service[];
    invoiceServices: Service[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _createInvoiceService: CreateInvoiceService,
        private router: Router
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.project = new Project(null)
        this.invoice = new Invoice(null);
        this.getProjects();
    }

    async ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.createProjectsForm();
        this.createInvoiceForm();
    }

    createProjectsForm(){
        this.projectsForm = this._formBuilder.group({
            project: [this.project],
        });
    }


    createInvoiceForm(){
        console.log(this.project.remainingPayment , typeof this.project.remainingPayment);
        this.invoicesForm = this._formBuilder.group({
            totalDue: [this.invoice.totalDue  , [Validators.required , Validators.max(this.project.remainingPayment) ]],
            description: [this.invoice.description],
            taxRate: [this.invoice.taxRate]
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    finishForm(): void {
        // Populating details data into the details object
        let data = this.invoicesForm.getRawValue();
        this.invoice = new Invoice(data);
        this.invoice.invoiceDate = new Date();

        console.log('details ', this.invoice);
        // Change the remaining payment in the project
        // Attach the project id to the invoice ??

        this._createInvoiceService
            .addInvoice(this.invoice , this.project.projectNumber)
            .then((project: Project) => {
                console.log("project in add invoice " , project);
                    this.router.navigateByUrl(
                        '/main/show-invoice/'+ project.projectNumber + '/' + project.invoices[project.invoices.length - 1].invoiceNumber
                    );}
            );
    }

    private async getProjects() {
        this.savedProjects = await this._createInvoiceService.getProjects();
    }

    populateProjectDetails(e) {
        this.project = this.savedProjects.filter((x) => x.projectName === e)[0];
        this.createProjectsForm();
        this.createInvoiceForm();
        this.showProjectsForm = true;
    }

    calculateTaxValue(){
        this.invoice.taxValue = this.invoice.taxRate * this.invoice.totalDue / 100;
    }
}
