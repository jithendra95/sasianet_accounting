import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { AssignDiaryPage } from '../assign-diary/assign-diary';

/**
 * Generated class for the ViewDiaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-diary',
  templateUrl: 'view-diary.html',
})
export class ViewDiaryPage {

  diaryList =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:Storage,public http: HTTP,public intProv:InterfaceProvider) {

                this.getDiaryList();
  }

 
  refresh(refresher){
    
        this.getDiaryList();
        refresher.complete();
      }
    
      async getDiaryList(){
       
    
        this.storage.get('email').then(email=>{
          this.storage.get('token').then(token=>{
            this.storage.get('schema').then( schema=>{
            
              let loader=this.intProv.presentLoading();
              loader.present();
              

              let headers={'Accept': 'application/json',
              'Authorization': 'Basic ' + token
              }
              this.http.setDataSerializer('json');


              this.http.get(SERVICE_URL+"diary/diary_level1?user_id="+email+"&connect_schema="+schema,
                                 '', headers)
                .then(data => {
                  let jsonData=JSON.parse(data.data);
                  console.log(jsonData);
                   this.diaryList=jsonData;
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

      diaryAssign(obj){
        this.navCtrl.push(AssignDiaryPage,{Id:obj.Id,Content:obj.Content});
        //this.intProv.presentToast("Not implemeneted yet");
      }

}
