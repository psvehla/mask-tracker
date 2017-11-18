import { TestBed, ComponentFixture, async }             from '@angular/core/testing';
import { By }                                           from '@angular/platform-browser';
import { DebugElement }                                 from '@angular/core';
import { IonicModule, NavController, AlertController }  from 'ionic-angular';
import { Vibration }                                    from '@ionic-native/vibration';

import { MyApp }              from '../../app/app.component';
import { HomePage }           from './home';
import { MaskProvider }   from '../../providers/mask/mask';
import { LoggerProvider } from '../../providers/logger/logger';
import { NavControllerMock, VibrationMock, MaskProviderMock, LoggerProviderMock }  from '../../mocks';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let de: DebugElement;
let el: HTMLElement;

describe('Page: Home Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, HomePage],

            providers: [
              {provide: NavController, useClass: NavControllerMock},
              {provide: Vibration, useClass: VibrationMock},
              {provide: MaskProvider, useClass: MaskProviderMock},
              {provide: LoggerProvider, useClass: LoggerProviderMock}
            ],

            imports: [
                IonicModule.forRoot(MyApp)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(HomePage);
        comp    = fixture.componentInstance;

    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
        de = null;
        el = null;
    });

    it('is created', () => {

        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();

    });
});
