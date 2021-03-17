import { MatStepperModule } from "@angular/material/stepper";
import { CreateInvoicesComponent } from "./create-invoices/create-invoices.component";
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

import { ServicesComponent } from "app/main/services/services.component";
import { ServicesService } from "app/main/services/services.service";
import { ServiceComponent } from "app/main/service/service.component";
import { ServiceService } from "app/main/service/service.service";
import { InvoicesComponent } from "app/main/invoices/invoices.component";
import { InvoicesService } from "app/main/invoices/invoices.service";
import { InvoiceComponent } from "app/main/invoice/invoice.component";
import { InvoiceService } from "app/main/invoice/invoice.service";
import { CreateInvoiceService } from "./create-invoices/create-invoice.service";
import { MatDatepicker } from "@angular/material/datepicker";
import { InvoiceModernComponent } from "./show-invoice/show-invoice-component/show-invoice.component";
import { ShowInvoiceService } from "./show-invoice/show-invoice.service";
import {CommonModule} from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './project/project.component';
import {ProjectsService} from './projects/projects.service';

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
    {
        path: "show-invoice/:invoiceNumber",
        component: InvoiceModernComponent,
        resolve: {
            data: ShowInvoiceService,
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
        ProjectComponent,
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
    ],
})
export class MainModule {}
