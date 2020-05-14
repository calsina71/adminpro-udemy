import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }

    });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitalesTodos()
                          .subscribe( (resp: any ) => this.hospitales = resp.hospitales);

    this._modalUploadService.notificacion
        .subscribe( resp => {
          // console.log( resp );
          this.medico.img = resp.medico.img;
        });
  }


  guardarMedico( forma: NgForm ) {

    if (forma.invalid) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
          .subscribe( medico => {
            // console.log(resp);
            this.medico = medico;

            this.router.navigate( ['/medicos'] );

          });

  }


  cambiarHospital( id: string ) {

    this._hospitalService.obtenerHospital( id )
          .subscribe( (hospital: Hospital) => {
            // console.log( hospital );
            this.hospital = hospital;
          });

  }


  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }



  cargarMedico( id: string ) {

    this._medicoService.cargarMedico( id )
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambiarHospital( this.medico.hospital );
        });

  }
}
