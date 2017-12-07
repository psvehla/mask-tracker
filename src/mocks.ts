import { Mask } from './app/mask';

export class ConfigMock {

  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class AppMock {

}

export class FormMock {
  public register(): any {
    return true;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuControllerMock {

}

export class StatusBarMock {

}

export class SplashScreenMock {

}

export class NavControllerMock {

}

export class AlertControllerMock {
}

export class VibrationMock {
  vibrate(time: number | Array<number>): void {
    // do nothing
  }
}

export class MaskProviderMock {
  private masks: Mask[] = [ new Mask() ];

  getMasks(): Promise<Mask[]> {
    return Promise.resolve(this.masks);
  }

  getInitialMasks(): Mask[] {
    return this.masks;
  }

  saveMasks(masks: Mask[]): void {
    this.masks = masks;
  }

  calculateRemaining(mask: Mask): number {
    return 100;
  }
}

export class LoggerProviderMock {

}
