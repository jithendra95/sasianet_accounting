import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMemoPage } from './add-memo';

@NgModule({
  declarations: [
    AddMemoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMemoPage),
  ],
})
export class AddMemoPageModule {}
