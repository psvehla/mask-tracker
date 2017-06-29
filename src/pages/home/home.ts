import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';

import { Mask } from '../../app/mask';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private deleteDisabled: boolean = true;

  private masks: Mask[] = [
    {name: "mask 1", yellow: 0, orange: 0, red: 0, purple: 0, brown: 0},
    {name: "mask 2", yellow: 0, orange: 0, red: 0, purple: 0, brown: 0},
    {name: "mask 3", yellow: 0, orange: 0, red: 0, purple: 0, brown: 0}
  ];

  private currentMask: Mask = this.masks[0];
  private remaining: number = 86;

  constructor(public navCtrl: NavController) {
  }
}
