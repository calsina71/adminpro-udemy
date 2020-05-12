import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  cargando: boolean = true;
  medicos: Medico[] = [];
  desde: number = 0;


  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }


  cambiarDesde( valor: number ) {

    // El 'valor' es el número de posiciones que sumamos al 'desde' el registro que tiene
    // que empezar hasta el 'limit' que fijamos en la función 'get'->'find' del 'usuario'
    // en el Back-End server.

    const valorDesde = this.desde + valor;

    if ( valorDesde >= this._medicoService.totalRegistros ) {
      return;
    }

    if ( valorDesde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();

  }


  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos( this.desde )
        .subscribe( (resp: any) => this.medicos = resp );
    this.cargando = false;
  }


  borrarMedico( id: string ) {
    this._medicoService.borrarMedico( id )
        .subscribe( () => this.cargarMedicos() );
  }


  buscarMedicos( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos( termino)
        .subscribe( (medicos: Medico[]) => {
          this.medicos = medicos;
          this.cargando = false;
        });

  }

}
