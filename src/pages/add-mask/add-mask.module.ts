import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMaskPage } from './add-mask';

@NgModule({
  declarations: [
    AddMaskPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMaskPage),
  ],
  exports: [
    AddMaskPage
  ]
})
export class AddMaskPageModule {}
