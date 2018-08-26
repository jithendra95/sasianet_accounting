import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignDiaryPage } from './assign-diary';

@NgModule({
  declarations: [
    AssignDiaryPage,
  ],
  imports: [
    IonicPageModule.forChild(AssignDiaryPage),
  ],
})
export class AssignDiaryPageModule {}
