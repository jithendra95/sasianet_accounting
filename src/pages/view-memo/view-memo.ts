import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { AddMemoPage } from '../add-memo/add-memo';

/**
/**
 * Generated class for the ViewMemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-memo',
  templateUrl: 'view-memo.html',
})
export class ViewMemoPage {

  memoList =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage:Storage,public http: HTTP,public intProv:InterfaceProvider) {
  }

  ionViewDidLoad() {
    this.getMemoList()
  }


  refresh(refresher){
    
        this.getMemoList();
        refresher.complete();
      }
    
      async getMemoList(){
       
    
        this.storage.get('email').then(email=>{
          this.storage.get('token').then(token=>{
            this.storage.get('schema').then( schema=>{
              /*var headers = new Headers();
              headers.append("Accept", 'application/json');
              headers.append('Content-Type', 'application/json' );
              headers.append('Authorization', 'Basic ' +token);
              let options = new RequestOptions({ headers: headers });*/
           
              /*let getParams = {
                user_id: userId,
                connect_schema :schema
              }*/
              let loader=this.intProv.presentLoading();
              loader.present();
              

              let headers={'Accept': 'application/json',
              'Authorization': 'Basic ' + token
              }
              this.http.setDataSerializer('json');


              this.http.get(SERVICE_URL+"memo/get_memo_list?user_id="+email+"&connect_schema="+schema,
                                 '', headers)
                .then(data => {
                  let jsonData=JSON.parse(data.data);
                  console.log(jsonData);
                   this.memoList=jsonData;
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
    
      getItems(ev: any) {
        // Reset items back to all of the items
        //this.getClientList();
    
        // set val to the value of the searchbar
        const val = ev.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.memoList = this.memoList.filter((item) => {
            if(item.Name && item.Name !='')
            return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }else{
          this.getMemoList();
        }
      }
    
    
      addMemo(){
        this.navCtrl.push(AddMemoPage);
      }
    
     

}
