import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AuthGuard } from './shared/guard/auth.guard';


export const APP_ROUTES : Routes = [
    { path: '', component : LoginComponent},
    {
        path: 'page',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    { path: 'sign-up', component: SignUpComponent},
    { path: 'not-found', component : NotFoundComponent},
    { path : '**', redirectTo: 'not-found'},

];
export const Routing : ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);