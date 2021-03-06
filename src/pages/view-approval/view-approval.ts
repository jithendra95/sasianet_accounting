import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Approval_item } from '../../model/Approval_Item';


import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { ConfirmApprovalPage } from '../confirm-approval/confirm-approval';
/**
 * Generated class for the ViewApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-approval',
  templateUrl: 'view-approval.html',
})
export class ViewApprovalPage {

  appList =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
               private storage:Storage,public http: HTTP,public intProv:InterfaceProvider) {

                this.getAppList();
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


              this.http.get(SERVICE_URL+"approval/applevel1?user_id="+email+"&connect_schema="+schema,
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

      confirmApproval(obj){
        this.navCtrl.push(ConfirmApprovalPage,{Id:obj.Id,Content:obj.Content});
      }

}
