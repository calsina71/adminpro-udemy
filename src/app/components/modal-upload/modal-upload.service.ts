import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public coleccion: string;
  public id: string;

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    // console.log(' modal-upload service listo');

  }

  ocultarModal() {
    this.oculto = 'oculto';

    this.coleccion = null;
    this.id = null;
  }

  mostrarModal( coleccion: string, id: string ) {
    this.oculto = '';

    this.coleccion = coleccion;
    this.id = id;
  }

}
