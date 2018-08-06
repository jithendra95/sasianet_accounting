import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDiaryPage } from './view-diary';

@NgModule({
  declarations: [
    ViewDiaryPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDiaryPage),
  ],
})
export class ViewDiaryPageModule {}
