import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
    // this.regresaObservable().pipe(
    //   // Si falla, reintentará la operación 2 veces.
    //   retry(2)
    // )
    .subscribe(
      numero => console.log( 'Subs:', numero ),
      error  => console.error('Error:', error),
      () => console.log( 'El observador termino!')
    );

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log( 'La página se va ha cerrar' );
    this.subscripcion.unsubscribe();
  }


  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
        //   // clearInterval( intervalo );
        //   observer.error('Se ha producido un error en la operación!');
        // }

      }, 1000 );

    }).pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {

        // console.log( 'Filter:', valor, index );
        if ( ( valor % 2 ) === 1 ) {
          // Número Impar
          return true;
        } else {
          // Número Par
          return false;
        }

      })
    );

  }

}
