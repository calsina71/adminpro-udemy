import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
  ) {
    this.cargarTokenDeLocalStorage();
  }


  cargarTokenDeLocalStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
      this.router.navigate(['/login']);
    }

  }


  cargarHospitales( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get( url );

  }


  cargarHospitalesTodos() {

    const url = URL_SERVICIOS + '/hospital/todos';

    return this.http.get( url );

  }


  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url)
            .map( (resp: any) => resp.hospital );

  }


  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    swal('Hospital eliminado', `El hospital con Id: ${id} \n ha sido eliminado`, 'success');
    return this.http.delete( url )
      .map( resp => true );

  }


  crearHospital( nombre: string ) {

      let url = URL_SERVICIOS + '/hospital';
      url += '?token=' + this.token;

      return this.http.post(url, { nombre })
      .map((resp: any) => {

          console.log( 'crearHospital', nombre );
          swal('Hospital creado', nombre, 'success');
          return resp.hospital;
        });

  }


  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
      .map( (resp: any) => {
        console.log (resp.hospitales);
        return resp.hospitales;
      });

  }


  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;


    return this.http.put( url, hospital )
      .map( (resp: any) => {

        swal('Hospital actualizado', hospital.nombre, 'success');

        return true;

      });

  }


  cambiarImagen(archivo: File, id: string) {
    console.log( 'ENTRA EN CAMBIARIMAGEN');

    this._subirArchivoService.subirArchivo( archivo, 'hospitales', id )
      .then( (resp: any) => {
        console.log( 'respuesta de subirArchivoService', resp );
        this.hospital.img = resp.hospital.img;
        swal('Imagen actualizada', this.hospital.nombre, 'success');
      })
      .catch(resp => {
        console.log(resp);
      });

  }

}
