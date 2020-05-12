import { RouterModule, Routes } from '@angular/router';
// Rutas generales
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../services/guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
// Rutas de mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponent,
        data: { titulo: 'Dashboard', descripcion: 'Esta es la página de Dashboard' }
      },
      {
        path: 'progress', component: ProgressComponent,
        data: { titulo: 'Progress', descripcion: 'Esta es la página de progress bars' }
      },
      {
        path: 'graficas1', component: Graficas1Component,
        data: { titulo: 'Gráficas', descripcion: 'Esta es la página de gráficas' }
      },
      {
        path: 'promesas', component: PromesasComponent,
        data: { titulo: 'Promesas', descripcion: 'Esta es la página de ejemplo de promesas' }
      },
      {
        path: 'rxjs', component: RxjsComponent,
        data: { titulo: 'RxJs', descripcion: 'Esta es la página de Ejemplos de RxJs' }
      },
      {
        path: 'acount-settings', component: AccountSettingsComponent,
        data: { titulo: 'Ajustes del Tema', descripcion: 'Esta es la página de Ajustes del Tema' }
      },
      {
        path: 'perfil', component: ProfileComponent,
        data: { titulo: 'Perfil de usuario', descripcion: 'Esta es la página de perfil del usuario' }
      },
      // Mantenimientos
      {
        path: 'usuarios', component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de usuarios', descripcion: 'Esta es la página de mantenimiento de usuarios' }
      },
      {
        path: 'hospitales', component: HospitalesComponent,
        data: { titulo: 'Mantenimiento de hospitales', descripcion: 'Esta es la página de mantenimiento de hospitales' }
      },
      {
        path: 'medicos', component: MedicosComponent,
        data: { titulo: 'Mantenimiento de médicos', descripcion: 'Esta es la página de mantenimiento de médicos' }
      },
      {
        path: 'medico/:id', component: MedicoComponent,
        data: { titulo: 'Actualización de médico', descripcion: 'Esta es la página para actualizar un médico determinado' }
      },
      {
        path: '', pathMatch: 'full', redirectTo: '/dashboard'
      }
    ]
  }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
