import { Routes } from '@angular/router';
import { AuthenticationComponent } from 'src/authentication/authentication.component';
import { ClimbingAppButtonComponent } from 'src/components/climbing-app-button/climbing-app-button.component';
import { ClimbingAppIconComponent } from 'src/components/climbing-app-icon/climbing-app-icon.component';
import { ClimbingAppInputComponent } from 'src/components/climbing-app-input/climbing-app-input.component';
import { DashboardComponent } from 'src/dashboards/dashboard/dashboard.component';
import { AppComponent } from './app.component';



export const DECLARATIONS = [
    DashboardComponent,
    AuthenticationComponent,
    AppComponent
];

const EXPORT_COMPONENT_DECLARATION = [
    ClimbingAppIconComponent,
    ClimbingAppInputComponent,
    ClimbingAppButtonComponent,
];

export const EXPORT_DECLARATIONS = [
    ...EXPORT_COMPONENT_DECLARATION,
];


export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {
                path: 'login',
                loadChildren: () => import('./../authentication/login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'registration',
                loadChildren: () => import('./../authentication/registration/registration.module').then(m => m.RegistrationModule)
            }
        ]
    },
];
