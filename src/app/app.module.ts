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
import {  HttpModule } from '@angular/http';
import { HideFabDirective } from '../directives/hide-fab/hide-fab';
import { AddClientPage } from '../pages/add-client/add-client';
import { AddMemoPage } from '../pages/add-memo/add-memo';

import { AutoCompleteModule } from 'ionic2-auto-complete';

import { IonTextAvatar } from 'ionic-text-avatar';
import { MemoAutoCompleteProvider } from '../providers/memo-auto-complete/memo-auto-complete';
import { HTTP } from '@ionic-native/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Network } from '@ionic-native/network';
import { ConfirmApprovalPage } from '../pages/confirm-approval/confirm-approval';
import { AssignDiaryPage } from '../pages/assign-diary/assign-diary';
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
    HideFabDirective,
    AddClientPage,
    AddMemoPage,
    ConfirmApprovalPage,
    IonTextAvatar,
    AssignDiaryPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AutoCompleteModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
   
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
    LoginPage,
    AddClientPage,
    AddMemoPage,
    ConfirmApprovalPage,
    AssignDiaryPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InterfaceProvider,
    MemoAutoCompleteProvider,
    HTTP,
    FileTransfer,
    Network
  ]
})
export class AppModule {}
