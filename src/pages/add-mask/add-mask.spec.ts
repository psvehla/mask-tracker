import { TestBed, ComponentFixture, async, fakeAsync, tick }  from '@angular/core/testing';
import { By }                                                 from '@angular/platform-browser';
import { DebugElement }                                       from '@angular/core';
import { IonicModule, NavController, AlertController }        from 'ionic-angular';
import { Vibration }                                          from '@ionic-native/vibration';
import { NavControllerMock, AlertControllerMock }             from 'ionic-mocks';

import { MyApp }                                                                    from '../../app/app.component';
import { AddMaskPage }                                                              from '../add-mask/add-mask';
import { MaskProvider }                                                             from '../../providers/mask/mask';
import { LoggerProvider }                                                           from '../../providers/logger/logger';
import { VibrationMock, MaskProviderMock, LoggerProviderMock }                      from '../../mocks';

let comp: AddMaskPage;
let fixture: ComponentFixture<AddMaskPage>;
let page: Page;
let de: DebugElement;
let el: HTMLElement;

/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
   left:  { button: 0 },
   right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

/** Create the HomePage, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(AddMaskPage);
  comp    = fixture.componentInstance;
  page    = new Page();

  page.addPageElements();
}

class Page {
  incrementYellowButton: DebugElement;
  decrementYellowButton: DebugElement;
  incrementOrangeButton: DebugElement;
  decrementOrangeButton: DebugElement;
  incrementRedButton: DebugElement;
  decrementRedButton: DebugElement;
  incrementPurpleButton: DebugElement;
  decrementPurpleButton: DebugElement;
  incrementBrownButton: DebugElement;
  decrementBrownButton: DebugElement;
  addMaskButton: DebugElement;
  deleteMaskButton: DebugElement;

  addPageElements() {
    // if (comp.masks.length > 0) {
    //   const buttons = fixture.debugElement.queryAll(By.css('button'));
    //   this.incrementYellowButton = buttons[0];
    //   this.decrementYellowButton = buttons[1];
    //   this.incrementOrangeButton = buttons[2];
    //   this.decrementOrangeButton = buttons[3];
    //   this.incrementRedButton = buttons[4];
    //   this.decrementRedButton = buttons[5];
    //   this.incrementPurpleButton = buttons[6];
    //   this.decrementPurpleButton = buttons[7];
    //   this.incrementBrownButton = buttons[8];
    //   this.decrementBrownButton = buttons[9];
    //   this.addMaskButton = buttons[10];
    //   this.deleteMaskButton = buttons[11];
    // }
  }
}

// function testPageState(maskName: string): void {
//   expect(comp.decrementYellowDisabled).toBeTruthy();
//   expect(comp.decrementOrangeDisabled).toBeTruthy();
//   expect(comp.decrementRedDisabled).toBeTruthy();
//   expect(comp.decrementPurpleDisabled).toBeTruthy();
//   expect(comp.decrementBrownDisabled).toBeTruthy();
//   expect(comp.currentMask.name).toBe(maskName);
//   expect(comp.currentMask.yellow).toBe(0);
//   expect(comp.currentMask.orange).toBe(0);
//   expect(comp.currentMask.red).toBe(0);
//   expect(comp.currentMask.purple).toBe(0);
//   expect(comp.currentMask.brown).toBe(0);
//   expect(comp.remaining).toEqual(100);
// }

// function testInitialPageState(maskName: string): void {
//   fakeAsync((comp) => {
//     comp.ngOnInit();
//     tick();
//     testPageState(maskName);
//     expect(comp.deleteDisabled).toBeTruthy();
//     expect(comp.masks.length).toEqual(1);
//   });
// }

// function testYellowIncrementAndDecrement(): void {
//   comp.incrementYellow();
//   expect(comp.currentMask.yellow).toBe(1);
//   expect(comp.decrementYellowDisabled).toBeFalsy();
//   expect(comp.remaining).toEqual(100);
//   comp.decrementYellow();
//   expect(comp.currentMask.yellow).toBe(0);
//   expect(comp.decrementYellowDisabled).toBeTruthy();
//   expect(comp.remaining).toEqual(100);
// }

// function testOrangeIncrementAndDecrement(): void {
//   comp.incrementOrange();
//   expect(comp.currentMask.orange).toBe(1);
//   expect(comp.decrementOrangeDisabled).toBeFalsy();
//   expect(comp.remaining).toEqual(100);
//   comp.decrementOrange();
//   expect(comp.currentMask.orange).toBe(0);
//   expect(comp.decrementOrangeDisabled).toBeTruthy();
//   expect(comp.remaining).toEqual(100);
// }

// function testRedIncrementAndDecrement(): void {
//   comp.incrementRed();
//   expect(comp.currentMask.red).toBe(1);
//   expect(comp.decrementRedDisabled).toBeFalsy();
//   expect(comp.remaining).toEqual(100);
//   comp.decrementRed();
//   expect(comp.currentMask.red).toBe(0);
//   expect(comp.decrementRedDisabled).toBeTruthy();
//   expect(comp.remaining).toEqual(100);
// }

// function testPurpleIncrementAndDecrement(): void {
//   comp.incrementPurple();
//   expect(comp.currentMask.purple).toBe(1);
//   expect(comp.decrementPurpleDisabled).toBeFalsy();
//   expect(comp.remaining).toEqual(100);
//   comp.decrementPurple();
//   expect(comp.currentMask.purple).toBe(0);
//   expect(comp.decrementPurpleDisabled).toBeTruthy();
//   expect(comp.remaining).toEqual(100);
// }

// function testBrownIncrementAndDecrement(): void {
//   comp.incrementBrown();
//   expect(comp.currentMask.brown).toBe(1);
//   expect(comp.decrementBrownDisabled).toBeFalsy();
//   expect(comp.remaining).toEqual(100);
//   comp.decrementBrown();
//   expect(comp.currentMask.brown).toBe(0);
//   expect(comp.decrementBrownDisabled).toBeTruthy();
//   expect(comp.remaining).toEqual(100);
// }

// function testIncrementAndDecrement(): void {
//   testYellowIncrementAndDecrement();
//   testOrangeIncrementAndDecrement();
//   testRedIncrementAndDecrement();
//   testPurpleIncrementAndDecrement();
//   testBrownIncrementAndDecrement();
// }

describe('Page: Add Mask Page', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            declarations: [MyApp, AddMaskPage],

            providers: [
              {provide: NavController, useFactory: () => NavControllerMock.instance()},
              {provide: AlertController, useFactory: () => AlertControllerMock.instance()},
              {provide: Vibration, useFactory: () => VibrationMock.instance()},
              {provide: MaskProvider, useClass: MaskProviderMock},
              {provide: LoggerProvider, useClass: LoggerProviderMock}
            ],

            imports: [
                IonicModule.forRoot(MyApp)
            ]

        })
        .compileComponents()
        .then(createComponent);

    }));

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

    // it('has the correct initial state', () => {
    //   testInitialPageState('Mask 1');
    // });

    // it('can increment and decrement the counts', () => {
    //   testIncrementAndDecrement();
    // });

    // it('allows masks to be added and removed', () => {
    //   comp.addMask('A');
    //   testPageState('A');
    //   expect(comp.deleteDisabled).toBeTruthy();
    //   expect(comp.masks.length).toEqual(1); // implicitly tests that pruneNewMasks() had done its job
    //   testIncrementAndDecrement();
    //
    //   comp.addMask('B');
    //   testPageState('B');
    //   expect(comp.deleteDisabled).toBeFalsy();
    //   expect(comp.masks.length).toEqual(2);
    //   testIncrementAndDecrement();
    //   comp.deleteMask();
    //
    //   testPageState('A');
    //   expect(comp.deleteDisabled).toBeTruthy();
    //   expect(comp.masks.length).toEqual(1);
    //   testIncrementAndDecrement();
    // });
});
