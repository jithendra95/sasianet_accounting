import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { InterfaceProvider } from '../../providers/interface/interface';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
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
              private storage: Storage,public http: Http) {

  }

 login(){

  let loader=this.intProv.presentLoading();
  //loader.present();

  if(this.validateInput()){

    /*if(this.email=='kanishka@sasianet.com' && this.password=='all123'){
        
      this.navCtrl.setRoot(HomePage);
      this.menu.enable(true);
      this.storage.set('status', true);
      this.storage.set('email', this.email);
      this.storage.set('password', this.password);
      this.storage.set('schema', 'DTMSFAC');
      this.storage.set('token', btoa(this.email+":"+this.password));
      
      loader.dismiss();
    }else{
      this.intProv.presentToast('Invalid credentials');
      loader.dismiss();
    }*/

          var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          headers.append('Authorization', 'Basic ' + btoa(this.email+":"+'481426f982fab8f979bbc75dec0befafb828642b'));
          let options = new RequestOptions({ headers: headers });
      
          let getParams = {
            email: this.email,
            password :'481426f982fab8f979bbc75dec0befafb828642b'
          }
          
          this.http.post(SERVICE_URL+"User/Validate"
                            ,getParams, options)
            .subscribe(data => {
              let returnData=data['_body'];
              console.log(data['_body']);
            }, error => {
              console.log(error);// Error getting the data
            });
        
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
