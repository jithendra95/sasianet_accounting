import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ViewMemoPage } from '../pages/view-memo/view-memo';
import { ViewDiaryPage } from '../pages/view-diary/view-diary';
import { ViewClientPage } from '../pages/view-client/view-client';
import { ViewApprovalPage } from '../pages/view-approval/view-approval';
import { ViewDashboardPage } from '../pages/view-dashboard/view-dashboard';
import { LoginPage } from '../pages/login/login';
import { IonicStorageModule } from '@ionic/storage';
import { InterfaceProvider } from '../providers/interface/interface';
import { ClientServiceProvider } from '../providers/client-service/client-service';
import {  HttpModule } from '@angular/http';
import { HideFabDirective } from '../directives/hide-fab/hide-fab';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ViewMemoPage,
    ViewDiaryPage,
    ViewClientPage,
    ViewApprovalPage,
    ViewDashboardPage,
    LoginPage,
    HideFabDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ViewMemoPage,
    ViewDiaryPage,
    ViewClientPage,
    ViewApprovalPage,
    ViewDashboardPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InterfaceProvider,
    ClientServiceProvider
    
  ]
})
export class AppModule {}
