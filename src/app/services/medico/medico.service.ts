import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalRegistros: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarMedicos(desde: number) {

    const url = URL_SERVICIOS + '/medico/?desde=' + desde;

    return this.http.get(url)
      .map((resp: any) => {
        this.totalRegistros = resp.total;
        return resp.medicos;
      });

  }


  buscarMedicos(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
      .map((resp: any) => {
        // console.log ('buscarMedicos', resp.medicos);
        this.totalRegistros = resp.total;
        return resp.medicos;
      });

  }


  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      url += '/' + medico._id;
    }

    url += '?token=' + this._usuarioService.token;

    if (medico._id) {
      return this.http.put(url, medico)
        .map((resp: any) => {
          swal('Médico actualizado', medico.nombre, 'success');
          // console.log( resp );
          return resp.medico;
        });
    } else {
      return this.http.post(url, medico)
        .map((resp: any) => {
          swal('Médico creado', medico.nombre, 'success');
          // console.log( resp );
          return resp.medico;
        });
    }

  }


  cargarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
      .map((resp: any) => resp.medico);

  }


  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map(resp => {
        swal('Médico eliminado', `El médico con Id: ${id} \n ha sido eliminado`, 'success');
        return resp;
      });

  }

}
