import { RouterModule, Routes } from '@angular/router';
// Rutas
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const pagesRoutes: Routes = [
  { path: '',
      component: PagesComponent,
      children: [
          { path: 'dashboard', component: DashboardComponent,
            data: { titulo: 'Dashboard', descripcion: 'Esta es la página de Dashboard'} },
          { path: 'progress', component: ProgressComponent,
            data: { titulo: 'Progress', descripcion: 'Esta es la página de progress bars'} },
          { path: 'graficas1', component: Graficas1Component,
            data: { titulo: 'Gráficas', descripcion: 'Esta es la página de gráficas'} },
          { path: 'promesas', component: PromesasComponent,
            data: { titulo: 'Promesas', descripcion: 'Esta es la página de ejemplo de promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', descripcion: 'Esta es la página de Ejemplos de RxJs'} },
          { path: 'acount-settings', component: AccountSettingsComponent,
            data: { titulo: 'Ajustes del Tema', descripcion: 'Esta es la página de Ajustes del Tema'} },
          { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
      ]
  }

];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
