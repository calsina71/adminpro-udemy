import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Page404Component } from './shared/page404/page404.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
    { path: '',
      component: PagesComponent,
      children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'graficas1', component: Graficas1Component },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: Page404Component }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
