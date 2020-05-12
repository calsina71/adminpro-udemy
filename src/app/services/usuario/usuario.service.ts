import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarLocalStorage();
  }


  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }


  cargarLocalStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
      this.router.navigate(['/login']);
    }

  }


  guardarEnLocalStorage(id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }


  logout() {

    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }


  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token })
      .map((resp: any) => {

        this.guardarEnLocalStorage(resp._id, resp.token, resp.usuario);

        return true;
      });

  }


  login(usuario: Usuario, recordar: boolean = false) {

    const url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario)
      .map((resp: any) => {

        this.guardarEnLocalStorage(resp.id, resp.token, resp.usuario);

        return true;

      });

  }


  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      });

  }


  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;


    return this.http.put( url, usuario )
      .map( (resp: any) => {

        const usuarioDB: Usuario = resp.usuario;

        if ( usuario._id === this.usuario._id ) {
          // console.log('Este es el usuario actualizado: ', usuarioDB);
          this.guardarEnLocalStorage( usuarioDB._id, this.token, usuarioDB );
        }

        swal('Usuario actualizado', usuarioDB.nombre, 'success');

        return true;

      });

  }


  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        // console.log( 'cambiarImagen - usuarios', resp );
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarEnLocalStorage(id, this.token, this.usuario);

      })
      .catch(resp => {
        console.log(resp);
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

    swal('Usuario eliminado', `El usuario con Id: ${id} \n ha sido eliminado`, 'success');
    return this.http.delete( url )
      .map( resp => true );

  }

}
