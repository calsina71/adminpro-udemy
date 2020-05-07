import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService ) { }

  canActivate() {

    if ( this._usuarioService.estaLogueado() ) {

      // console.log('Paso el Guard');
      return true;

    } else {

      // console.log('Bloqueado por el Guard');
      return false;

    }

  }

}
