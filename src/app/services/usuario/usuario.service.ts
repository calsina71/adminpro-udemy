import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
// import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient ) {

    console.log('Servicio de usuario listo para usar');

  }

  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {
               // swal( 'Usuario creado', usuario.email, 'success');
                return resp.usuario;
              });

  }

}
