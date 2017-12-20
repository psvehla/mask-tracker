import { TestBed, ComponentFixture, inject, fakeAsync, tick }      from '@angular/core/testing';
import { DebugElement }                           from '@angular/core';
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

  let comp:     MaskProvider;
  let fixture:  ComponentFixture<MaskProvider>;
  let de:       DebugElement;
  let el:       HTMLElement;

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
});
