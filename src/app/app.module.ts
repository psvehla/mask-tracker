import { BrowserModule }                            from '@angular/platform-browser';
import { ErrorHandler, NgModule }                   from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen }                             from '@ionic-native/splash-screen';
import { StatusBar }                                from '@ionic-native/status-bar';
import { File }                                     from '@ionic-native/file';
import { Vibration }                                from '@ionic-native/vibration';

import { MyApp }        from './app.component';
import { HomePage }     from '../pages/home/home';
import { MaskProvider } from '../providers/mask/mask';
import { LoggerProvider } from '../providers/logger/logger';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MaskProvider,
    LoggerProvider
  ]
})
export class AppModule {}
