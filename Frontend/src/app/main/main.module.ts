import { ProjectService } from "./project/create/project.service";
import { MatStepperModule } from "@angular/material/stepper";
import { CreateInvoicesComponent } from "./invoice/create/create-invoices.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { AgmCoreModule } from "@agm/core";

import { FuseSharedModule } from "@fuse/shared.module";
import { FuseWidgetModule } from "@fuse/components/widget/widget.module";

import { ServicesComponent } from "app/main/service/list/services.component";
import { ServicesService } from "app/main/service/list/services.service";
import { ServiceComponent } from "app/main/service/details/service.component";
import { ServiceService } from "app/main/service/details/service.service";
import { InvoicesComponent } from "app/main/invoice/list/invoices.component";
import { InvoicesService } from "app/main/invoice/list/invoices.service";
import { InvoiceComponent } from "app/main/invoice/details/invoice.component";
import { InvoiceService } from "app/main/invoice/details/invoice.service";
import { CreateInvoiceService } from "./invoice/create/create-invoice.service";
import { MatDatepicker } from "@angular/material/datepicker";
import { InvoiceModernComponent } from "./invoice/show-invoice/show-invoice-component/show-invoice.component";
import { ShowInvoiceService } from "./invoice/show-invoice/show-invoice.service";
import { CommonModule } from "@angular/common";
import { ProjectsComponent } from "./project/list/projects.component";
import { CreateProjectComponent } from "./project/create/create-project.component";
import { ProjectsService } from "./project/list/projects.service";
import {ProjectDetailsComponent} from './project/details/project-details.component';
import {ProjectDetailsService} from './project/details/project-details.service';

const routes: Routes = [
    {
        path: "services",
        component: ServicesComponent,
        resolve: {
            data: ServicesService,
        },
    },
    {
        path: "services/:id",
        component: ServiceComponent,
        resolve: {
            data: ServiceService,
        },
    },
    // Invoices
    {
        path: "show-invoice/:projectNumber/:invoiceNumber",
        component: InvoiceModernComponent,
        resolve: {
            data: ShowInvoiceService,
        },
    },
    {
        path: "invoices",
        component: InvoicesComponent,
        resolve: {
            data: InvoicesService,
        },
    },
    {
        path: "invoices/create",
        component: CreateInvoicesComponent,
        resolve: {
            data: CreateInvoiceService,
        },
    },
    {
        path: "invoices/:invoiceNumber",
        component: InvoiceComponent,
        resolve: {
            data: InvoiceService,
        },
    },
    // Projects
    {
        path: "projects",
        component: ProjectsComponent,
        resolve: {
            data: ProjectsService,
        },
    },
    {
        path: "projects/create",
        component: CreateProjectComponent,
        resolve: {
            data: ProjectService,
        },
    },
    {
        path: "projects/:projectNumber",
        component: ProjectDetailsComponent,
        resolve: {
            data: ProjectDetailsService,
        },
    },
];

@NgModule({
    declarations: [
        ServicesComponent,
        ServiceComponent,
        InvoicesComponent,
        InvoiceComponent,
        InvoiceModernComponent,
        CreateInvoicesComponent,
        ProjectsComponent,
        CreateProjectComponent,
        ProjectDetailsComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatStepperModule,

        NgxChartsModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8",
        }),

        FuseSharedModule,
        FuseWidgetModule,
    ],
    providers: [
        ServicesService,
        ServiceService,
        InvoicesService,
        InvoiceService,
        CreateInvoiceService,
        ShowInvoiceService,
        ProjectDetailsService
    ],
})
export class MainModule {}
