import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { InvoiceService } from 'app/main/invoices1/invoice.service';
import { InvoiceModernComponent } from 'app/main/invoices1/modern/modern.component';

const routes = [
    {
        path     : 'invoices1/modern',
        component: InvoiceModernComponent,
        resolve  : {
            search: InvoiceService
        }
    }
];

@NgModule({
    declarations: [
        InvoiceModernComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule
    ],
    providers   : [
        InvoiceService
    ]
})
export class InvoiceModernModule
{
}
