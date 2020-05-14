import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  oculto: string = 'oculto';

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarHospitales() );
  }



  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }


  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
        // console.log( 'CargarHospitales', resp );
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
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
    this.cargarHospitales();

  }


  buscarHospitales(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales: Hospital[]) => {

        // console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;

      });
  }


  borrarHospital( hospital: Hospital ) {

    // console.log( hospital );

    swal({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar el hospital: \n\n${hospital.nombre}\nId: ${hospital._id}\n\n`,
      icon: 'warning',
      buttons: [ 'Cancelar', 'Borrar' ],
      dangerMode: true,
    })
    .then( borrar => {

      // console.log( borrar );

      if ( borrar ) {
        this._hospitalService.borrarHospital( hospital._id )
          .subscribe( ok => {

            this.desde = 0;
            this.cargarHospitales();

          });
      }
    });

  }

  cerrarModal() {
    this.oculto = 'oculto';
  }

  mostrarModalCrearHospital() {
    this.oculto = '';
  }

  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
        .subscribe();
  }


  crearHospital() {

    swal(
      {
        title: 'Crear Hospital',
        text: 'Ingrese el nombre del hospital',
        content: {
          element: 'input',
          attributes: {
            placeholder: 'Nombre del hospital',
          },
        },
        icon: 'info',
        buttons: ['Cancelar', 'Guardar'],
        dangerMode: true,
      }
    ).then ( ( valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
          .subscribe( () => this.cargarHospitales() );

    });

  }

}
