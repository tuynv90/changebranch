import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignUpComponent } from "./sign-up/sign-up.component";


export const APP_ROUTES : Routes = [
    { path: '', component : LoginComponent},
    { path: 'not-found', component : NotFoundComponent},
    { path : '**', redirectTo: 'not-found'},
    { path: 'page', loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'sign-up', component: SignUpComponent}

];
export const Routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);