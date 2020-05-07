import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';


@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imagenASubir: File = null;
  imagenTemp: string | ArrayBuffer;


  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void { }


  cerrarModal() {
    this.imagenTemp = null;
    this.imagenASubir = null;

    this._modalUploadService.ocultarModal();
  }


  seleccionImagen( archivo: File ) {

    // console.log( archivo );

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


  subirImagen() {

      this._subirArchivoService.subirArchivo( this.imagenASubir, this._modalUploadService.coleccion, this._modalUploadService.id )
          .then( resp => {
            console.log( resp );
            this._modalUploadService.notificacion.emit( resp );
            this.cerrarModal();
          })
          .catch( err => {
            console.log('Error en la carga ...');
          });

  }

}
