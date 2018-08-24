import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { AlertController } from 'ionic-angular';

import { ItemSliding } from 'ionic-angular';
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
  saveList=[];
  dataLoaded=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:Storage,public http: HTTP,public intProv:InterfaceProvider,
              private alertCtrl: AlertController) {

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
                   this.dataLoaded=true;
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

  async saveApproval(type){

    this.saveList=[];

    for(let item of this.appList){
      if(item.IsSelect){
        
        this.saveList.push(item);
      }
    }

    if(this.saveList.length==0){
      this.intProv.presentToast('No record selected');
    }else{
      let desc='';

      if(type=='A'){
        desc='Approval'
      }else if(type=='D'){
        desc='Disapproval'
      }else if(type=='S'){
        desc='Send back'
      }
      this.presentPrompt(type,desc);
    }
  }


  submitConfirmation(type,comment){

    for(let item of this.saveList){
      this.intProv.presentToast(type+'   '+item.Id);
    }

    this.storage.get('email').then(email=>{
      this.storage.get('token').then(token=>{
        this.storage.get('schema').then( schema=>{
          
          let loader=this.intProv.presentLoading();
          loader.present();
  
          let headers={'Accept': 'application/json',
          'Authorization': 'Basic ' + token
          }
          this.http.setDataSerializer('json');
  
          let postParams = this.saveList;
  
          this.http.post(SERVICE_URL+"approval/approve_level2?user_id="+email+"&connect_schema="+schema+
                        "&level1_id="+this.Id+"&comment="+comment+"&approve_status="+type+"&system_id=none"
                         ,postParams , headers)
            .then(data => {
              //let jsonData=JSON.parse(data.data);
              //console.log(jsonData);
  
              this.intProv.presentToast("Approval Successfull ");
              this.getAppList();
              loader.dismiss();
              //this.navCtrl.pop();
               
             }, error => {
               loader.dismiss();
              console.log(error);// Error getting the data
              //return error;
            });
          })
         });
       });
   
  }




  presentPrompt(type,desc) {
    let alert = this.alertCtrl.create({
      title: desc,
      message: 'Are you sure you want save ? ',
      inputs: [
        {
          name: 'comment',
          placeholder: 'Comment'
        }
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.submitConfirmation(type,data.comment)
          }
        }
      ]
    });
    alert.present();
  }

  sendBack(item,slidingItem: ItemSliding) {
    this.saveList=[];
    this.saveList.push(item);
    this.presentPrompt('S','Send back');
    //console.log(slidingItem);
    slidingItem.close();

  }

 
}
