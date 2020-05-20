import { RouterModule, Routes } from '@angular/router';

// Rutas generales
// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

// Guards
// import { LoginGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';

// Rutas de mantenimientos
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


const pagesRoutes: Routes = [
  // ---- Modificado, para cargar las rutas hijas por Lazyload.
  // {
    // path: '',
    // component: PagesComponent,
    // canActivate: [LoginGuard],
    // children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ VerificaTokenGuard ],
        data: { titulo: 'Dashboard', descripcion: 'Esta es la página de Dashboard' }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress', descripcion: 'Esta es la página de progress bars' }
      },
      {
        path: 'graficas1',
        component: Graficas1Component,
        data: { titulo: 'Gráficas', descripcion: 'Esta es la página de gráficas' }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas', descripcion: 'Esta es la página de ejemplo de promesas' }
      },
      {
        path: 'rxjs',
        component: RxjsComponent,
        data: { titulo: 'RxJs', descripcion: 'Esta es la página de Ejemplos de RxJs' }
      },
      {
        path: 'acount-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes del Tema', descripcion: 'Esta es la página de Ajustes del Tema' }
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        data: { titulo: 'Perfil de usuario', descripcion: 'Esta es la página de perfil del usuario' }
      },
      {
        path: 'busqueda/:termino',
        component: BusquedaComponent,
        data: { titulo: 'Buscador', descripcion: 'Esta es la página del buscador' }
      },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
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
  //   ]
  // }

];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
