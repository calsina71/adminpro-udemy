import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { Page404Component } from './page404/page404.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    Page404Component,
    BreadcrumbsComponent,
    ModalUploadComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    Page404Component,
    BreadcrumbsComponent,
    ModalUploadComponent
  ]
})

export class SharedModule { }
