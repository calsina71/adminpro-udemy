import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }


  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }


  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        // console.log( 'cargarUsuarios', resp );
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });

  }


  cambiarDesde( valor: number ) {

    // El 'valor' es el número de posiciones que sumamos al 'desde' el registro que tiene
    // que empezar hasta el 'limit' que fijamos en la función 'get'->'find' del 'usuario'
    // en el Back-End server.

    const valorDesde = this.desde + valor;

    if ( valorDesde >= this.totalRegistros ) {
      return;
    }

    if ( valorDesde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }


  buscarUsuarios( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {

        // console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;

      });
  }


  borrarUsuario( usuario: Usuario ) {

    // console.log( usuario );

    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No se puede eliminar usuario', 'No se puede eliminar eliminar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de eliminar a ' + usuario.nombre,
      icon: 'warning',
      buttons: [ 'Cancelar', 'Borrar' ],
      dangerMode: true,
    })
    .then( borrar => {

      // console.log( borrar );

      if ( borrar ) {
        this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( ok => {

            this.desde = 0;
            this.cargarUsuarios();

          });
      }
    });

  }

  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizarUsuario( usuario )
      .subscribe();
  }

}
