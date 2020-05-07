import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenASubir: File;

  imagenTemp: string | ArrayBuffer;


  constructor(
    public _usuarioService: UsuarioService 
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }


  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email  = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();

  }


  seleccionImagen( archivo: File ) {

    console.log( archivo );

    if ( !archivo ) {
      this.imagenASubir = null;
      return;
    }

    if ( archivo.type.indexOf( 'image' ) < 0 ) {
      swal('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenASubir = null;
      return;
    }

    this.imagenASubir = archivo;

    // En vanilla JS
    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }


  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenASubir, this.usuario._id );

  }

}
