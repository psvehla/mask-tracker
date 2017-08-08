import { Injectable } from '@angular/core';
import { File }       from '@ionic-native/file';
import { Platform }   from 'ionic-angular';

import 'rxjs/add/operator/map';

import { Mask } from '../../app/mask';

/*
  Generated class for the MaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MaskProvider {

  private masks: Mask[] = [
    {name: "mask 1", yellow: 1, orange: 2, red: 3, purple: 4, brown: 5},
    {name: "mask 2", yellow: 6, orange: 7, red: 8, purple: 9, brown: 10},
    {name: "mask 3", yellow: 11, orange: 12, red: 13, purple: 14, brown: 15}
  ];

  private readonly MASKS_PERSISTENCE_FILENAME: string = "masks";

  constructor(public platform: Platform, private file: File) { }

  getMasks(): Mask[] {
    console.log('getMasks() called');

    this.platform.ready().then(
      () => this.file.readAsText(this.file.dataDirectory, this.MASKS_PERSISTENCE_FILENAME).then((masks) => this.masks = JSON.parse(masks)).catch(err => this.saveMasks(this.masks))
    );

    return this.masks;
  }

  saveMasks(masks: Mask[]): void {
    console.log('saveMasks() called');
    this.platform.ready().then(() => this.file.writeFile(this.file.dataDirectory, this.MASKS_PERSISTENCE_FILENAME, JSON.stringify(masks), true).catch(err => console.log()));
  }

  calculateRemaining(mask: Mask): number {
    return Math.round(100 - (mask.yellow / 410 + mask.orange / 370 + mask.red / 210 + mask.purple / 160 + mask.brown / 80) * 100);
  }
}
