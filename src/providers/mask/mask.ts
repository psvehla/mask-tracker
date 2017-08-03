import { Injectable } from '@angular/core';
import { Storage }    from '@ionic/storage';

import 'rxjs/add/operator/map';

import { Mask } from '../../app/mask';

/*
  Generated class for the MaskProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MaskProvider {

  private keys: string[] = [];

  private masks: Mask[] = [
    {name: "mask 1", yellow: 1, orange: 2, red: 3, purple: 4, brown: 5},
    {name: "mask 2", yellow: 6, orange: 7, red: 8, purple: 9, brown: 10},
    {name: "mask 3", yellow: 11, orange: 12, red: 13, purple: 14, brown: 15}
  ];

  constructor(private storage: Storage) { }

  getMasks(): Mask[] {
    this.storage.keys().then((keys) => this.keys = keys);

    if (this.keys.length > 0) {
      this.masks = [];

      for (let key in this.keys) {
        this.storage.get(key).then((mask) => this.masks.push(mask));
      }
    }

    return this.masks;
  }

  saveMasks(masks: Mask[]): void {
    this.storage.clear();

    for (let mask of masks) {
      this.storage.set(mask.name, mask);
      console.log("stored " + mask.name);
    }
  }

  calculateRemaining(mask: Mask): number {
    return Math.round(100 - (mask.yellow / 410 + mask.orange / 370 + mask.red / 210 + mask.purple / 160 + mask.brown / 80) * 100);
  }
}
