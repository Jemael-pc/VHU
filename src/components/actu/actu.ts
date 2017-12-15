import { Component } from '@angular/core';

/**
 * Generated class for the ActuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'actu',
  templateUrl: 'actu.html'
})
export class ActuComponent {

  text: string;

  constructor() {
    console.log('Hello ActuComponent Component');
    this.text = 'Hello World';
  }

}
