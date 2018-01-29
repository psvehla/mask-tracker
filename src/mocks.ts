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

export class AlertControllerMock {

}

export class VibrationMock {
  public static instance(): any {
    let instance = jasmine.createSpyObj('Vibration', ['vibrate']);
    instance.vibrate.and.stub();
    return instance;
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
  log(message: string): void {
    // do nothing
  }
}

export interface IWriteOptions {
    replace?: boolean;
    append?: boolean;
    truncate?: number;
}

export class FileMock {
  public externalDataDirectory: string = "aDirectory";

  readAsText(path: string, file: string): Promise<string> {
    return Promise.resolve('a string');
  }

  writeFile(path: string, fileName: string, text: string | Blob | ArrayBuffer, options?: IWriteOptions): Promise<any> {
    return Promise.resolve();
  }
}
