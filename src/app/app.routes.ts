
import { Routes, RouterModule } from '@angular/router';
// Componentes
import { Page404Component } from './shared/page404/page404.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/service.index';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '',
      component: PagesComponent,
      canActivate: [LoginGuard],
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      // loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: Page404Component }

];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
