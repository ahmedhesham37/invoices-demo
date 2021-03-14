import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';

import {FuseSharedModule} from '@fuse/shared.module';

import {CreateInvoicesComponent} from './create-invoices.component';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
    {
        path: 'invoices1/create',
        component: CreateInvoicesComponent
    }
];

@NgModule({
    declarations: [
        CreateInvoicesComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,

        FuseSharedModule,
        MatTabsModule,
    ]
})
export class CreateInvoicesModule {}