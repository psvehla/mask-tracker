import { Injectable } from '@angular/core';

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

  constructor() {
  }

  getMasks(): Mask[] {
    return this.masks;
  }

  calculateRemaining(mask: Mask): number {
    return 85;
  }
}
