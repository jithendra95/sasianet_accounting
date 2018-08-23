import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmApprovalPage } from './confirm-approval';

@NgModule({
  declarations: [
    ConfirmApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmApprovalPage),
  ],
})
export class ConfirmApprovalPageModule {}
