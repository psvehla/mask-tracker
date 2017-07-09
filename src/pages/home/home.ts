import { Component }      from '@angular/core';
import { NavController }  from 'ionic-angular';

import { Mask } from '../../app/mask';

import { MaskProvider } from '../../providers/mask/mask';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  deleteDisabled: boolean = true;

  private masks: Mask[] = this.maskService.getMasks();
  private currentMask: Mask = this.masks[0];

  remaining: number = this.maskService.calculateRemaining(this.currentMask);

  constructor(public navCtrl: NavController, public maskService: MaskProvider) {
  }

  incrementYellow(): void {
    this.currentMask.yellow++;
    this.pushChanges();
  }

  decrementYellow(): void {
    if (this.currentMask.yellow > 0) {
      this.currentMask.yellow--;
      this.pushChanges();
    }
  }

  incrementOrange(): void {
    this.currentMask.orange++;
    this.pushChanges();
  }

  decrementOrange(): void {
    if (this.currentMask.orange > 0) {
      this.currentMask.orange--;
      this.pushChanges();
    }
  }

  incrementRed(): void {
    this.currentMask.red++;
    this.pushChanges();
  }

  decrementRed(): void {
    if (this.currentMask.red > 0) {
      this.currentMask.red--;
      this.pushChanges();
    }
  }

  incrementPurple(): void {
    this.currentMask.purple++;
    this.pushChanges();
  }

  decrementPurple(): void {
    if (this.currentMask.purple > 0) {
      this.currentMask.purple--;
      this.pushChanges();
    }
  }

  incrementBrown(): void {
    this.currentMask.brown++;
    this.pushChanges();
  }

  decrementBrown(): void {
    if (this.currentMask.brown > 0) {
      this.currentMask.brown--;
      this.pushChanges();
    }
  }

  private pushChanges(): void {
    this.remaining = this.maskService.calculateRemaining(this.currentMask);
  }
}
