import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
        .subscribe( params => {
          const termino = params.termino;
          // console.log( termino);
          this.buscar( termino );
        });
   }

  ngOnInit(): void {
  }


  buscar( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url )
        .subscribe( (resp: any) => {
          // console.log( 'Respuesta: ', resp );

          this.hospitales = resp.hospitales;
          this.usuarios = resp.usuarios;
          this.medicos = resp.medicos;

        });
  }

}
