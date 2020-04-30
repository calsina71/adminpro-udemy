import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router ) {

    this.cargarLocalStorage();

  }


  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }


  cargarLocalStorage() {

    if ( localStorage.getItem( 'token' ) ){
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
    } else {
      this.token = '';
      this.usuario = null;
      this.router.navigate( ['/login'] );
    }

  }


  guardarEnLocalStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }


  logout(){

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }


  loginGoogle( token: string ) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token }  )
              .map( (resp: any) => {

                this.guardarEnLocalStorage( resp.id, resp.token, resp.usuario );

                return true;
              });

  }


  login( usuario: Usuario, recordar: boolean = false ) {

    const url = URL_SERVICIOS + '/login';

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                this.guardarEnLocalStorage( resp.id, resp.token, resp.usuario );

                return true;

              });

  }



  crearUsuario( usuario: Usuario ) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
              .map( (resp: any) => {
                swal( 'Usuario creado', usuario.email, 'success');
                return resp.usuario;
              });

  }

}
