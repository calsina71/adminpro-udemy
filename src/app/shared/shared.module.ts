import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Componentes
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { Page404Component } from './page404/page404.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    Page404Component,
    BreadcrumbsComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    Page404Component,
    BreadcrumbsComponent
  ]
})

export class SharedModule { }
