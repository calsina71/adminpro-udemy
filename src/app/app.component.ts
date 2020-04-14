
import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [ ]
})
export class AppComponent {
  title = 'adminPro';

  constructor( public _ajustes: SettingsService ) { }
}
