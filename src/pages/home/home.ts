import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewMemoPage } from '../view-memo/view-memo';
import { ViewDiaryPage } from '../view-diary/view-diary';
import { ViewApprovalPage } from '../view-approval/view-approval';
import { ViewDashboardPage } from '../view-dashboard/view-dashboard';
import { LoginPage } from '../login/login';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ClientServiceProvider } from '../../providers/client-service/client-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  undreadNotification=0;

  constructor(public navCtrl: NavController,public menu:MenuController,
                private alertCtrl:AlertController) {

  }

  buttonClick(screen){

    
    switch(screen) { 
      case 'memo': { 
        this.navCtrl.setRoot(ViewMemoPage);
        //this.navCtrl.pop();
        break; 
      } 
      case 'diary': { 
        this.navCtrl.setRoot(ViewDiaryPage);
        //this.navCtrl.pop();
         break; 
      } case 'approval': { 
        this.navCtrl.setRoot(ViewApprovalPage);
        //this.navCtrl.pop();
        break; 
     } case 'dashboard': { 
      this.navCtrl.setRoot(ViewDashboardPage);
      //this.navCtrl.pop();
      break; 
   } 
   
     
   } 

  }

  logoutConfirm(){
    
    let confirm = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout ?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'No',
          handler: () => {
           
          }
        }
      ]
    });
    confirm.present();
    
    
    }


  logout(){

     this.menu.enable(false);
     this.navCtrl.setRoot(LoginPage);
  }
}
