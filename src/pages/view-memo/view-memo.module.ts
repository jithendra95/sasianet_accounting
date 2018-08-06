import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewMemoPage } from './view-memo';

@NgModule({
  declarations: [
    ViewMemoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMemoPage),
  ],
})
export class ViewMemoPageModule {}
