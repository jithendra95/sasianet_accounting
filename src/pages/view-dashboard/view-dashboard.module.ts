import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDashboardPage } from './view-dashboard';

@NgModule({
  declarations: [
    ViewDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDashboardPage),
  ],
})
export class ViewDashboardPageModule {}
