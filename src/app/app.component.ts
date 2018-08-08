import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ViewClientPage } from '../pages/view-client/view-client';
import { ViewMemoPage } from '../pages/view-memo/view-memo';
import { ViewDiaryPage } from '../pages/view-diary/view-diary';
import { ViewApprovalPage } from '../pages/view-approval/view-approval';
import { ViewDashboardPage } from '../pages/view-dashboard/view-dashboard';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';

import { Events } from 'ionic-angular';
import { MenuController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  email ='';
  system='';
  pages: Array<{title: string, component: any,icon: string}>;
  reportPages: Array<{title: string, component: any,icon: string}>;



  constructor(public platform: Platform, public statusBar: StatusBar, 
              public splashScreen: SplashScreen,private storage: Storage,
              public menu:MenuController,public events: Events) {

                events.subscribe('user:login', () => {
                  // user and time are the same arguments passed in `events.publish(user, time)`
                //  console.log('Welcome', user, 'at', time);
                  this.storage.get('email').then(result=>{
                    this.email=result;
                   });

                   this.storage.get('system_name').then(result=>{
                    this.system=result;
                   });
                });


                this.storage.get('status').then((val) => {
                  if(val){

                       this.storage.get('email').then(result=>{
                        this.email=result;
                       });

                       this.storage.get('system_name').then(result=>{
                        this.system=result;
                       });

                      this.rootPage= HomePage;
                  }else{
                    this.menu.enable(false);
                    this.rootPage= LoginPage;
                  }
            
                  this.splashScreen.hide();
                }).catch(function(error){
                  this.menu.enable(false);
                  this.rootPage= LoginPage;
                  this.splashScreen.hide();
                });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',       component: HomePage,         icon: 'home' },
      { title: 'Client',     component: ViewClientPage,   icon: 'person-add' },
      { title: 'Memo',       component: ViewMemoPage,     icon: 'clipboard' },
      { title: 'Diary',      component: ViewDiaryPage,    icon: 'book' },
      { title: 'Approval',   component: ViewApprovalPage, icon: 'checkmark-circle' }
    ];

    this.reportPages = [
      { title: 'Dashboard',       component: ViewDashboardPage,         icon: 'apps' },
      { title: 'Reports',         component: ViewClientPage,            icon: 'list' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
