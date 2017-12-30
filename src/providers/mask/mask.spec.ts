import { TestBed, inject, fakeAsync, tick }      from '@angular/core/testing';
import { File }                                   from '@ionic-native/file';
import { IonicModule, Platform, AlertController } from 'ionic-angular';
import { PlatformMock, AlertControllerMock  }     from 'ionic-mocks';

import { MyApp }          from '../../app/app.component';
import { HomePage }       from '../../pages/home/home';
import { MaskProvider }   from './mask';
import { Mask }           from '../../app/mask';
import { LoggerProvider } from '../logger/logger';

import { FileMock, LoggerProviderMock }  from '../../mocks';

describe('Mask Service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({

      declarations: [MyApp, HomePage],

      providers: [
        MaskProvider,
        {provide: Platform, useFactory: () => PlatformMock.instance()},
        {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
        {provide: File, useClass: FileMock},
        {provide: LoggerProvider, useClass: LoggerProviderMock}
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ]
    });
  });

  it("can get masks", inject([MaskProvider], (maskProvider) => {
    fakeAsync(() => {
      tick();
      expect(maskProvider.getMasks()).toEqual(Promise.resolve([ new Mask() ]));
    });
  }));

  it("can get initial masks", inject([MaskProvider], (maskProvider) => {
    fakeAsync(() => {
      tick();
      expect(maskProvider.getInitialMasks()).toEqual(Promise.resolve([ new Mask() ]));
    });
  }));

  it("can save masks", inject([MaskProvider], (maskProvider) => {
    fakeAsync(() => {
      tick();
      expect(maskProvider.saveMasks()).not.toThrow();
      maskProvider.externalDataDirectory = null;
      expect(maskProvider.saveMasks()).not.toThrow();
    });
  }));
});
