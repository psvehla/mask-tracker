import { Injectable }                 from '@angular/core';
import { File }                       from '@ionic-native/file';
import { Platform, AlertController }  from 'ionic-angular';

import 'rxjs/add/operator/map';

import { Mask }           from '../../app/mask';
import { LoggerProvider } from '../logger/logger';

/**
 * A service for managing masks.
 */
@Injectable()
export class MaskProvider {

  /**
   * The list of masks being managed.
   * Initialised to a list containing one new mask, to allow the screen to paint before masks load from storage, and to allow for situations where masks cannot be loaded, such as
   * when no storage is available, and first runs.
   */
  private masks: Mask[] = [ new Mask() ];

  /**
   * If storage is not available, an alert is shown to the user informing them that any changes will not be saved.
   * The alert is shown only once, which is managed with this property.
   */
  private noStorageAlertShown: boolean = false;

  /**
   * The name of the file used to store mask data in local storage.
   */
  private readonly MASKS_PERSISTENCE_FILENAME: string = "masks.json";

  /**
   * Inject dependencies.
   */
  constructor(public platform: Platform, private alertCtrl: AlertController, private file: File, private logger: LoggerProvider) { }

  /**
   * Retrieve the masks being managed from local storage.
   * If the file isn't there yet, save the Initialised list and return that.
   *
   * @returns {Promise<Mask[]>} A promise with the masks being managed.
   */
  getMasks(): Promise<Mask[]> {
    return this.platform.ready().then(
      () => this.file.readAsText(this.file.externalDataDirectory, this.MASKS_PERSISTENCE_FILENAME)
              .then((masks) => {
                this.masks = JSON.parse(masks);
                return this.masks;
              })
              .catch(err => {
                console.log("Couldn't get masks in mask service, initialising...");
                this.saveMasks(this.masks);
                return this.masks;
              })
    );
  }

  /**
   * Gets a mask array now.
   * Used to give pages something to work with while they wait for getMasks() to fulfil its promise.
   * In a typical use case, this will usually be the Initialised Mask array.
   *
   * @returns {Mask[]} The masks being managed.
   */
  getInitialMasks(): Mask[] {
    return this.masks;
  }

  /**
   * Saves masks data to local storage.
   * Displays an alert if local storage cannot be accessed.
   *
   * @param {Mask[]} The masks being managed.
   */
  saveMasks(masks: Mask[]): void {
    if (this.file.externalDataDirectory) {
      this.logger.log(this.file.externalDataDirectory);

      this.file.writeFile(this.file.externalDataDirectory, this.MASKS_PERSISTENCE_FILENAME, JSON.stringify(masks), {"replace": true, "append": false, "truncate": 0})
        .catch(err => this.noLocalStorage(err));
    }
    else {
      this.noLocalStorage("File.externalDataDirectory not found.");
    }
  }

  /**
   * Handles the no local storage available situation.
   * Pops up a dialog to the user letting them know that anything they do won't be saved.
   *
   * @param {any} The error causing the no local storage available situation.
   */
  private noLocalStorage(err: any): void {
    this.logger.log("Can't access storage.");
    this.logger.log(err);

    if (!this.noStorageAlertShown) {
      let alert = this.alertCtrl.create({
        title: "Cannot access local storage.",
        subTitle: "Any changes you make cannot be saved.",
        buttons: ['dismiss']
      });
      alert.present();
      this.noStorageAlertShown = true;
    }
  }

  /**
   * Calculates the life remaining in a mask, as a percentage.
   * Currently only supports the VogMask formula (which also applies to Cambridge masks).
   *
   * @param {Mask} The mask to calculate the 'life remaining' for.
   * @returns {number} The life remaining in a mask, as a percentage.
   */
  calculateRemaining(mask: Mask): number {
    return Math.round(100 - (mask.yellow / 410 + mask.orange / 370 + mask.red / 210 + mask.purple / 160 + mask.brown / 80) * 100);
  }
}
