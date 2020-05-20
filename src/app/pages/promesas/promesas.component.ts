import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    const promesa = this.contarTres();

    promesa.then  ( mensaje => console.log('Finalizado:', mensaje) )
           .catch ( error => console.error('Se ha producido un error:', error) );
  }

  ngOnInit(): void {
  }


  contarTres(): Promise<boolean> {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;
        console.log( contador );

        if ( contador === 3 ) {
          resolve( true );
          // reject('Error en la ejecución de la promesa.');
          clearInterval( intervalo );
        }

      }, 1000 );
    });

  }

}
