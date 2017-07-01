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
    {name: "mask 1", yellow: 1, orange: 2, red: 3, purple: 4, brown: 5},
    {name: "mask 2", yellow: 6, orange: 7, red: 8, purple: 9, brown: 10},
    {name: "mask 3", yellow: 11, orange: 12, red: 13, purple: 14, brown: 15}
  ];

  private currentMask: Mask = this.masks[0];
  private remaining: number = 86;

  constructor(public navCtrl: NavController) {
  }

  private incrementYellow(): void {
    this.currentMask.yellow++;
  }

  private incrementOrange(): void {
    this.currentMask.orange++;
  }

  private incrementRed(): void {
    this.currentMask.red++;
  }

  private incrementPurple(): void {
    this.currentMask.purple++;
  }

  private incrementBrown(): void {
    this.currentMask.brown++;
  }
}
