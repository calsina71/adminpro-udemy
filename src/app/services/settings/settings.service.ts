import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable(
  // { providedIn: 'root' }
)
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // tslint:disable-next-line: variable-name
  constructor( @Inject(DOCUMENT) private _document ) {
    // En lugar de @Inject(DOCUMENT) private _document se puede usar document
    // (de JS directamente) sin tener que injectarlo en el constructor.
    this.cargarAjustes();
  }

  guardarAjustes() {
    // console.log('Guardado en el localStorage');

    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ) );

  }

  cargarAjustes() {
    if ( localStorage.getItem( 'ajustes') ) {
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) );
      // console.log('Cargando del localStorage');

    } else {
      // console.log('Usando valores por defecto');
    }

    this.aplicarTema ( this.ajustes.tema );
  }

  aplicarTema( tema: string ) {

    // tslint:disable-next-line: prefer-const
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();

  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
