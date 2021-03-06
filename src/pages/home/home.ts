import { Component, OnInit }                                from '@angular/core';
import { NavController, AlertController, ModalController }  from 'ionic-angular';
import { Vibration }                                        from '@ionic-native/vibration';

import { Mask } from '../../app/mask';

import { MaskProvider }   from '../../providers/mask/mask';
import { LoggerProvider } from '../../providers/logger/logger';

import { AddMaskPage } from '../add-mask/add-mask';

/**
 * The appliction home page, which is its only page.
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  decrementYellowDisabled: boolean = true;

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  decrementOrangeDisabled: boolean = true;

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  decrementRedDisabled: boolean = true;

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  decrementPurpleDisabled: boolean = true;

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  decrementBrownDisabled: boolean = true;

  /**
   * The decrement buttons are disabled if the count is 0. This variable keeps track of the yellow decrement button.
   */
  deleteDisabled: boolean = true;

  /**
   * The masks being managed.
   * Initialised to a list with one fresh mask in it so that the page can paint while the masks load. Also a good starting point if there are no masks to load.
   */
  masks: Mask[] = this.maskService.getInitialMasks();

  /**
   * The current mask being displayed.
   * Initialised to the first mask in the list. The code generally assumes and ensures that there is at least 1 mask in the list.
   */
  currentMask: Mask = this.masks[0];

  /**
   * The amount of life left in the mask being displayed. As a percentage.
   */
  remaining: number;

  /**
   * Inject dependencies.
   */
  constructor(
    public navCtrl: NavController, public alertCtrl: AlertController, public modalController: ModalController, private vibe: Vibration, public maskService: MaskProvider, public logger: LoggerProvider
  ) { }

  /**
   * Initialise the page by loading up the masks from local storage.
   */
  ngOnInit(): void {
    this.maskService.getMasks()
      .then(masks => {
        this.masks = masks;
      })
      .then(() => {
        this.currentMask = this.masks[0];
      })
      .then(() => {
        // this is a hack to 'wake up' the binding on the drop-down
        // I found that the page was getting painted before the data could be read from storage, so I had to initialise masks and currentMask to something. However, when the data was read,
        // the dropdown wasn't getting updated, even though masks was. I found adding an item here gets the binding going, with the dropdown being updated to the array in storage, plus the extra
        // item I've just added. pruneNewMasks() gets called elsewhere to avoid an accumulation of the new masks. I don't like it, but I can't figure out anything better for the moment. And the
        // UX works in a way that I'm happy with.
        this.masks.push(new Mask());
        this.update();
      })
      .catch(err => {
        console.log("There was a problem with reading mask data from local storage.");
        this.masks = this.maskService.getInitialMasks();
        this.update();
      });
  }

  /**
   * Removes unused new masks from the mask list.
   * Leaves one there if doing so leaves an empty list.
   * A hack above adds new masks to the masks list to 'wake up' the binding of the dropdown. This function deletes any unused new masks, to avoid a buildup of these new masks.
   */
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

  /**
   * Shows a popup describing the yellow pollution range.
   **/
  showYellowDescription(): void {
    let alert = this.alertCtrl.create({
      title: "51-100 (Yellow)",
      subTitle: "Air quality is acceptable. For some pollutants there may be a moderate health concern for a very small number of people.",
      buttons: ['dismiss']
    });

    alert.present();
  }

  /**
   * Shows a popup describing the orange pollution range.
   **/
  showOrangeDescription(): void {
    let alert = this.alertCtrl.create({
      title: "101-150 (Orange)",
      subTitle: "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
      buttons: ['dismiss']
    });

    alert.present();
  }

  /**
   * Shows a popup describing the red pollution range.
   **/
  showRedDescription(): void {
    let alert = this.alertCtrl.create({
      title: "151-200 (Red)",
      subTitle: "Everyone may begin to experience some adverse health effects, members of sensitive groups may experience more serious effects.",
      buttons: ['dismiss']
    });

    alert.present();
  }

  /**
   * Shows a popup describing the purple pollution range.
   **/
  showPurpleDescription(): void {
    let alert = this.alertCtrl.create({
      title: "201-300 (Purple)",
      subTitle: "This would trigger a health alert signifying that everyone may experience more serious health effects.",
      buttons: ['dismiss']
    });

    alert.present();
  }

  /**
   * Shows a popup describing the brown pollution range.
   **/
  showBrownDescription(): void {
    let alert = this.alertCtrl.create({
      title: "300+ (Brown)",
      subTitle: "Health alert: everyone may experience more serious health effects.",
      buttons: ['dismiss']
    });

    alert.present();
  }

  /**
   * Provides haptic feedback to the user that a button has been pressed.
   */
  private bump(): void {
    const BUMP_DURATION = 50;
    this.vibe.vibrate(BUMP_DURATION);
  }

  /**
   * Increments the yellow counter.
   */
  incrementYellow(): void {
    this.bump();
    this.currentMask.yellow++;
    this.update();
  }

  /**
   * Decrements the yellow counter.
   */
  decrementYellow(): void {
    if (this.currentMask.yellow > 0) {
      this.bump();
      this.currentMask.yellow--;
      this.update();
    }
  }

  /**
   * Increments the orange counter.
   */
  incrementOrange(): void {
    this.bump();
    this.currentMask.orange++;
    this.update();
  }

  /**
   * Decrements the orange counter.
   */
  decrementOrange(): void {
    if (this.currentMask.orange > 0) {
      this.bump();
      this.currentMask.orange--;
      this.update();
    }
  }

  /**
   * Increments the red counter.
   */
  incrementRed(): void {
    this.bump();
    this.currentMask.red++;
    this.update();
  }

  /**
   * Decrements the red counter.
   */
  decrementRed(): void {
    if (this.currentMask.red > 0) {
      this.bump();
      this.currentMask.red--;
      this.update();
    }
  }

  /**
   * Increments the purple counter.
   */
  incrementPurple(): void {
    this.bump();
    this.currentMask.purple++;
    this.update();
  }

  /**
   * Decrements the purple counter.
   */
  decrementPurple(): void {
    if (this.currentMask.purple > 0) {
      this.bump();
      this.currentMask.purple--;
      this.update();
    }
  }

  /**
   * Increments the brown counter.
   */
  incrementBrown(): void {
    this.bump();
    this.currentMask.brown++;
    this.update();
  }

  /**
   * Decrements the brown counter.
   */
  decrementBrown(): void {
    if (this.currentMask.brown > 0) {
      this.bump();
      this.currentMask.brown--;
      this.update();
    }
  }

  /**
   * Determines what colour the text displaying the life remaining in the mask should be.
   * Is normally black, but goes red if the number is negative, to alert the user they should probably invest in a new mask.
   */
  getRemainingColour(): string {
    return this.remaining > 0 ? "black" : "red";
  }

  /**
   * Creates a dialog that allows the user to add a new mask.
   */
  addMaskDialog(): void {
    let modal = this.modalController.create(AddMaskPage);

    modal.onDidDismiss(data => {
      if (data) {
        this.addMask(data)
      }
    });

    modal.present();
  }

  /**
   * Adds a mask to the list of masks being managed.
   *
   * @param {string} The name of the new mask.
   */
  addMask(maskName: string): void {
    let newMask: Mask = new Mask();
    newMask.name = maskName;
    this.masks.push(newMask);
    this.currentMask = newMask;
    this.update();
  }

  /**
   * Creates a dialog that facilitates the deltion of masks.
   */
  deleteMaskDialog(): void {
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
            this.deleteMask();
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Removes a mask from the list of masks being managed.
   */
  deleteMask(): void {
    if (this.masks.length > 1) {
      this.masks.splice(this.masks.indexOf(this.currentMask), 1);
      this.currentMask = this.masks[0];
      this.update();
    }
    else {
      console.error("An attempt has been made to delete the last mask in the list of masks being managed. The view should prevent this from happening.");
    }
  }

  /**
   * Performs general housekeeping that needs to be carried out whenever any data changes.
   * This method is called by all functions that change data.
   */
  private update(): void {
    this.pruneNewMasks();

    this.currentMask.yellow > 0 ? this.decrementYellowDisabled = false : this.decrementYellowDisabled = true;
    this.currentMask.orange > 0 ? this.decrementOrangeDisabled = false : this.decrementOrangeDisabled = true;
    this.currentMask.red > 0 ? this.decrementRedDisabled = false : this.decrementRedDisabled = true;
    this.currentMask.purple > 0 ? this.decrementPurpleDisabled = false : this.decrementPurpleDisabled = true;
    this.currentMask.brown > 0 ? this.decrementBrownDisabled = false : this.decrementBrownDisabled = true;

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
