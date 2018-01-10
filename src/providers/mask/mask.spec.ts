import { TestBed, inject, fakeAsync, tick }       from '@angular/core/testing';
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

  it("can get masks", fakeAsync(inject([MaskProvider], (maskProvider) => {
    let masks:Promise<Mask[]> = maskProvider.getMasks();
    tick();
    expect(masks).toEqual(Promise.resolve([ new Mask() ]));
  })));

  it("can get initial masks", inject([MaskProvider], (maskProvider) => {
    expect(maskProvider.getInitialMasks()).toEqual([ new Mask() ]);
  }));

  it("can save masks", fakeAsync(inject([MaskProvider], (maskProvider) => {
    spyOn(maskProvider.file, 'writeFile').and.callThrough();
    spyOn(maskProvider, 'noLocalStorage').and.callThrough();

    maskProvider.saveMasks([ new Mask() ]);
    expect(maskProvider.file.writeFile).toHaveBeenCalled();

    maskProvider.file.externalDataDirectory = null;
    maskProvider.saveMasks([ new Mask() ]);
    expect(maskProvider.noLocalStorage).toHaveBeenCalled();
  })));

  it("can calculate remaining mask life", inject([MaskProvider], (maskProvider) => {
    let mask = new Mask();
    mask.yellow = 1;
    mask.orange = 2;
    mask.red = 3;
    mask.purple = 4;
    mask.brown = 5;
    expect(maskProvider.calculateRemaining(mask)).toEqual(89);
  }));
});
