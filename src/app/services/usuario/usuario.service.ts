import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';

import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarLocalStorage();
  }


  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get( url )
      .map ( (resp: any) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('Token renovado');

        return true;
      })
      .catch ( err => {
        this.router.navigate(['/login']);
        swal( 'No se pudo renovar el token', 'No fue posible la renovación del token', 'error' );
        return throwError( err );
      });

  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }


  cargarLocalStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
      // this.router.navigate(['/login']);
    }

  }


  guardarEnLocalStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

  }


  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);

  }


  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .map((resp: any) => {

        this.guardarEnLocalStorage(resp._id, resp.token, resp.usuario, resp.menu);
        return true;
      });

  }


  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .map((resp: any) => {

        this.guardarEnLocalStorage(resp.id, resp.token, resp.usuario, resp.menu);
        // console.log(resp);
        return true;
      })
      .catch( err => {

        // console.log( 'Error: ' + err.status, err.error.mensaje );
        swal( err.error.mensaje, 'El correo o contraseña no válida', 'error' );
        return throwError( err );
      });

  }


  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
      .catch( err => {

        swal( err.error.mensaje, err.error.errors.message, 'error' );
        return throwError( err );
      });

  }


  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;


    return this.http.put( url, usuario )
      .map( (resp: any) => {


        if ( usuario._id === this.usuario._id ) {
          const usuarioDB: Usuario = resp.usuario;
          // console.log('Este es el usuario actualizado: ', usuarioDB);
          this.guardarEnLocalStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }

        swal('Usuario actualizado', usuario.nombre, 'success');

        return true;
      })
      .catch( err => {

        swal( err.error.mensaje, err.error.errors.message, 'error' );
        return throwError( err );
      });

  }


  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        // console.log( 'cambiarImagen - usuarios', resp );
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarEnLocalStorage(id, this.token, this.usuario, this.menu);

      })
      .catch( err => {
        console.log( err );
        return throwError( err );
      });

  }


  cargarUsuarios( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );

  }


  buscarUsuarios( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
      .map( (resp: any) => {
        // console.log ('buscarUsuarios', resp.usuarios);
        return resp.usuarios;
      });

  }


  borrarUsuario( id: string ) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
      .map( resp => {
        swal('Usuario eliminado', `El usuario con Id: ${id} \n ha sido eliminado`, 'success');
        return true;
      });

  }

}
