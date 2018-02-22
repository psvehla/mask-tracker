import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { IonicModule }                      from 'ionic-angular';
import { StatusBar }                        from '@ionic-native/status-bar';
import { SplashScreen }                     from '@ionic-native/splash-screen';
import { StatusBarMock, SplashScreenMock }  from 'ionic-mocks';

import { MyApp }                                              from './app.component';
import { HomePage }                                           from '../pages/home/home';
import { MaskProvider }                                       from '../providers/mask/mask';
import { MaskProviderMock }                                   from '../mocks';

let comp: MyApp;
let fixture: ComponentFixture<MyApp>;

describe('Component: Root Component', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp],

            providers: [
              {provide: StatusBar, useClass: StatusBarMock},
              {provide: SplashScreen, useClass: SplashScreenMock},
              {provide: MaskProvider, useClass: MaskProviderMock}
            ],

            imports: [
                IonicModule.forRoot(MyApp)
            ]

        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        comp    = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
        comp = null;
    });

    it('is created', () => {
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
    });

    it('initialises with a root page of HomePage', () => {
        expect(comp['rootPage']).toBe(HomePage);
    });
});
