import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

import { FakeDbService } from "app/fake-db/fake-db.service";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { RegisterModule } from "./main/auth/register/register.module";
import { LoginModule } from "./main/auth/login/login.module";
import { initializer } from "./utils/app-init";
import { AuthGuard } from "./utils/app-guard";
import { CommonModule } from "@angular/common";

const appRoutes: Routes = [
    {
        path: "main",
        loadChildren: () =>
            import("./main/main.module").then((m) => m.MainModule),
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { relativeLinkResolution: "legacy" }),

        KeycloakAngularModule,

        TranslateModule.forRoot(),

        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true,
        }),

        CommonModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        RegisterModule,
        LoginModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializer,
            deps: [KeycloakService],
            multi: true,
        },
    ],
})
export class AppModule {}
