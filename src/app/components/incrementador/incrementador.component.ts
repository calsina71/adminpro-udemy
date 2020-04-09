
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [ ]
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter< number > = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
   }

  ngOnInit(): void {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( nuevoValor: number ) {

    // const elementoHTML: any = document.getElementsByName('progreso')[0];
    // console.log( this.txtProgress );

    if ( nuevoValor >= 100 ) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    // elementoHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );

  }


  cambiarValor( valor: number ) {

    this.progreso += valor;

    if ( this.progreso > 100 ) {
      this.progreso = 100;
    }
    if ( this.progreso < 0 ) {
      this.progreso = 0;
    }
    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

}
