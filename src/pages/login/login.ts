import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { InterfaceProvider } from '../../providers/interface/interface';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email="";
  password="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menu:MenuController,private intProv:InterfaceProvider,
              private storage: Storage) {

  }

 login(){

  let loader=this.intProv.presentLoading();
  loader.present();

  if(this.validateInput()){

    if(this.email=='kanishka@sasianet.com' && this.password=='all123'){
        
      this.navCtrl.setRoot(HomePage);
      this.menu.enable(true);
      this.storage.set('status', true);
      this.storage.set('email', this.email);
      this.storage.set('password', this.password);
      this.storage.set('schema', 'DTMSFAC');
      loader.dismiss();
    }else{
      this.intProv.presentToast('Invalid credentials');
      loader.dismiss();
    }
  }else{
    loader.dismiss();
  }
  



 }

 validateInput(){

  if(this.email=='' || this.email==null){
    this.intProv.presentToast('Please enter email address');
    return false;
  }else if(this.password=='' || this.password==null){
    this.intProv.presentToast('Please enter password');
    return false;
  }else{
    return true
  }
 }

}
