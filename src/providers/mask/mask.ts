import { Injectable } from '@angular/core';
import { File }       from '@ionic-native/file';
import { Platform }   from 'ionic-angular';

import 'rxjs/add/operator/map';

import { Mask }           from '../../app/mask';
import { LoggerProvider } from '../logger/logger';

/*
  Generated class for the MaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MaskProvider {

  private masks: Mask[] = [ new Mask() ];

  private readonly MASKS_PERSISTENCE_FILENAME: string = "masks.json";

  constructor(public platform: Platform, private file: File, private logger: LoggerProvider) {
    this.getMasks();
  }

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

  getInitialMasks(): Mask[] {
    return this.masks;
  }

  saveMasks(masks: Mask[]): void {
    if (this.file.externalDataDirectory) {
      this.logger.log(this.file.externalDataDirectory);
      this.file.writeFile(this.file.externalDataDirectory, this.MASKS_PERSISTENCE_FILENAME, JSON.stringify(masks), {"replace": true, "append": false, "truncate": 0}).catch(err => this.logger.log(err));
    }
    else {
      this.logger.log("Can't access storage, create an alert here!")
    }
  }

  calculateRemaining(mask: Mask): number {
    return Math.round(100 - (mask.yellow / 410 + mask.orange / 370 + mask.red / 210 + mask.purple / 160 + mask.brown / 80) * 100);
  }
}
