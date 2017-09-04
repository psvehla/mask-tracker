import { Component, OnInit }              from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Mask } from '../../app/mask';

import { MaskProvider }   from '../../providers/mask/mask';
import { LoggerProvider } from '../../providers/logger/logger';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  deleteDisabled: boolean = true;

  private masks: Mask[] = this.maskService.getInitialMasks();
  private currentMask: Mask = this.masks[0];

  remaining: number;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public maskService: MaskProvider, public logger: LoggerProvider) { }

  ngOnInit(): void {
    this.maskService.getMasks()
      .then(masks => {
        this.masks = masks;
      })
      .then(() => {
        if (this.masks.length > 1) {
          this.deleteDisabled = false;
        }
      })
      .then(() => {
        this.currentMask = this.masks[0];
      })
      .then(() => {
        this.remaining = this.maskService.calculateRemaining(this.currentMask);
      })
      .then(() => {
        // this is a hack to 'wake up' the binding on the drop-down
        // I found that the page was getting painted before the data could be read from storage, so I had to initialise masks and currentMask to something. However, when the data was read,
        // the dropdown wasn't getting updated, even though masks was. I found adding an item here gets the binding going, with the dropdown being updated to the array in storage, plus the extra
        // item I've just added. I don't like it, but I can't figure out anything better for the moment. And the UX works in a way that I'm happy with.
        this.masks.push(new Mask());
        this.update();
      })
      .catch(err => {
        console.log("didn't get masks ok in home");
        this.masks = this.maskService.getInitialMasks();
      });
  }

  // A hack above adds new masks to the masks list to 'wake up' the binding of the dropdown. This deletes any unused new masks, to avoid a buildup of these new masks.
  pruneNewMasks(): void {
    if (this.masks.length > 1) {
      let aNewMask: string = JSON.stringify(new Mask());
      let isANewMask: (mask: Mask) => boolean = function(mask: Mask): boolean { return JSON.stringify(mask) !== aNewMask; }
      this.masks = this.masks.filter(isANewMask);
    }

    // If we've deleted all the masks, we'll add one here.
    if (this.masks.length < 1) {
      this.masks.push(new Mask());
      this.currentMask = this.masks[0];
    }
  }

  incrementYellow(): void {
    this.currentMask.yellow++;
    this.update();
  }

  decrementYellow(): void {
    if (this.currentMask.yellow > 0) {
      this.currentMask.yellow--;
      this.update();
    }
  }

  incrementOrange(): void {
    this.currentMask.orange++;
    this.update();
  }

  decrementOrange(): void {
    if (this.currentMask.orange > 0) {
      this.currentMask.orange--;
      this.update();
    }
  }

  incrementRed(): void {
    this.currentMask.red++;
    this.update();
  }

  decrementRed(): void {
    if (this.currentMask.red > 0) {
      this.currentMask.red--;
      this.update();
    }
  }

  incrementPurple(): void {
    this.currentMask.purple++;
    this.update();
  }

  decrementPurple(): void {
    if (this.currentMask.purple > 0) {
      this.currentMask.purple--;
      this.update();
    }
  }

  incrementBrown(): void {
    this.currentMask.brown++;
    this.update();
  }

  decrementBrown(): void {
    if (this.currentMask.brown > 0) {
      this.currentMask.brown--;
      this.update();
    }
  }

  getRemainingColour(): string {
    return this.remaining > 0 ? "black" : "red";
  }

  addMask(): void {
    let alert = this.alertCtrl.create({
      title: "Add Mask",
      inputs: [{
        name: 'name',
        placeholder: 'another mask'
      }],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'add',
          handler: data => {
            let newMask: Mask = new Mask();
            newMask.name = data.name;
            this.masks.push(newMask);
            this.currentMask = newMask;
            this.update();
          }
        }
      ]
    });
    alert.present();
  }

  deleteMask(): void {
    let alert = this.alertCtrl.create({
      title: "Delete Mask",
      message: "Are you sure you want to delete the mask '" + this.currentMask.name + "'?",
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'ok',
          handler: () => {
            this.masks.splice(this.masks.indexOf(this.currentMask), 1);
            this.currentMask = this.masks[0];
            this.update();
          }
        }
      ]
    });
    alert.present();
  }

  private update(): void {
    this.pruneNewMasks();
    this.remaining = this.maskService.calculateRemaining(this.currentMask);

    if (this.masks.length > 1) {
      this.deleteDisabled = false;
    }
    else {
      this.deleteDisabled = true;
    }

    this.maskService.saveMasks(this.masks);
  }
}
