import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';

/**
 * Generated class for the ConfirmApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-approval',
  templateUrl: 'confirm-approval.html',
})
export class ConfirmApprovalPage {

  header="";
  Id="";
  appList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:Storage,public http: HTTP,public intProv:InterfaceProvider) {

    if(this.navParams.get('Id')!=null){
      this.header=this.navParams.get('Content')
      this.Id=this.navParams.get('Id')
      this.getAppList();
    } 


  }

  refresh(refresher){
    
        this.getAppList();
        refresher.complete();
      }
    
      async getAppList(){
       
    
        this.storage.get('email').then(email=>{
          this.storage.get('token').then(token=>{
            this.storage.get('schema').then( schema=>{
            
              let loader=this.intProv.presentLoading();
              loader.present();
              

              let headers={'Accept': 'application/json',
              'Authorization': 'Basic ' + token
              }
              this.http.setDataSerializer('json');


              this.http.get(SERVICE_URL+"approval/applevel2?user_id="+email+"&connect_schema="+schema+"&level1_id="+this.Id,
                                 '', headers)
                .then(data => {
                  let jsonData=JSON.parse(data.data);
                  console.log(jsonData);
                   this.appList=jsonData;
                    loader.dismiss();
                   
                 }, error => {
                   loader.dismiss();
                  console.log(error);// Error getting the data
                  //return error;
                });
              })
             });
           });
         
      }

  

}
