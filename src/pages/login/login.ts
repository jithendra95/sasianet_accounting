import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { InterfaceProvider } from '../../providers/interface/interface';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import {SERVICE_URL} from '../../app/app.config';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

import { Events } from 'ionic-angular';
import CryptoJS from 'crypto-js';

import { HTTP } from '@ionic-native/http';

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
  multipleSystem=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public menu:MenuController,private intProv:InterfaceProvider,
              private storage: Storage,public http: HTTP,
              public actionSheetCtrl: ActionSheetController,public events: Events) {

                
                
             
  }


 


 login(){

  let loader=this.intProv.presentLoading();
  //loader.present();
  this.email=this.email.trim();
  if(this.validateInput()){

          let hashPassword=CryptoJS.SHA1(this.password).toString();
          /*var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          headers.append('Authorization', 'Basic ' + btoa(this.email+":"+hashPassword));
          let options = new RequestOptions({ headers: headers });*/
      
          let headers={'Accept': 'application/json',
                     'Authorization': 'Basic ' + btoa(this.email+":"+hashPassword)
                     }
          let getParams = {
            email: this.email,
            password :hashPassword
          }
          this.http.setDataSerializer('json');
          this.http.post(SERVICE_URL+"User/Validate?email="+this.email+"&password="+hashPassword
                            ,getParams, headers)
            .then(data => {

              

              
              let returnData=JSON.parse(data.data);
              console.log(returnData);
              if(this.email==returnData[0] && returnData[2]!=null){

                this.menu.enable(true);
                this.storage.set('status', true);
                this.storage.set('email', this.email);
                this.storage.set('password', hashPassword);
                this.storage.set('token', btoa(this.email+":"+this.password));
                

                loader.dismiss();
                this.directUser(returnData[2],returnData[8]);

              }else if(this.email==returnData[0] && returnData[2]==null){
                
                this.menu.enable(true);
                this.storage.set('status', true);
                this.storage.set('email', this.email);
                this.storage.set('password', hashPassword);
                this.storage.set('token', btoa(this.email+":"+this.password));

                  this.http.post(SERVICE_URL+"User/get_system_list?email="+this.email+"&password="+hashPassword
                                  ,getParams, headers)
                  .then(data => {
                         console.log(JSON.parse(data.data));
                         this.presentActionsheet(JSON.parse(data.data));
                    });

              }else{

                this.intProv.presentToast("Invalid Credentials");
              }
             
            }, error => {
              this.intProv.presentToast(error.toString());
              console.log(error.toString());// Error getting the data
            });
        
  }else{
    loader.dismiss();
  }

 }


 async presentActionsheet(dataObj){
  
       let buttonArr=[]
       for (let item of dataObj){

           let btnObj={text:item.Name,
                   handler : ()=>{
                         this.directUser(item.Id,item.Name) 
                       }
                     };
            buttonArr.push(btnObj);         
       }

       buttonArr.push({
                      text: 'Cancel',
                      role: 'cancel',
                      handler : ()=>{
                        this.menu.enable(false);
                        this.storage.set('status', false);
                        this.storage.set('email', '');
                        this.storage.set('password', '');
                        this.storage.set('token','');
                      }
                    });



      const actionSheet = this.actionSheetCtrl.create({
        title: 'Select System',
        buttons: buttonArr
      });
      actionSheet.present();
    }

 directUser(schema,name){
 
  this.storage.set('schema',schema);
  this.storage.set('system_name',name);
  this.events.publish('user:login');
  this.navCtrl.setRoot(HomePage);
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
