import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HTTP } from '@ionic-native/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { AddClientPage } from '../add-client/add-client';
/**
 * Generated class for the ViewClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-client',
  templateUrl: 'view-client.html',
})
export class ViewClientPage {

  clientList =[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage:Storage,public http: HTTP,public intProv:InterfaceProvider) {

   this.getClientList();
   
  }

  ionViewDidEnter(){
    this.getClientList();
  }
  refresh(refresher){

    this.getClientList();
    refresher.complete();
  }

  async getClientList(){
   

    this.storage.get('email').then(email=>{
      this.storage.get('token').then(token=>{
        this.storage.get('schema').then( schema=>{
         /* var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          headers.append('Authorization', 'Basic ' +token);
          let options = new RequestOptions({ headers: headers });*/
       
          /*let getParams = {
            user_id: userId,
            connect_schema :schema
          }*/
          let headers={'Accept': 'application/json',
              'Authorization': 'Basic ' + token
              }
              this.http.setDataSerializer('json');
          let loader=this.intProv.presentLoading();
          loader.present();
          this.http.get(SERVICE_URL+"client/get_client_list?user_id="+email+"&connect_schema="+schema,
                             '', headers)
            .then(data => {
              let jsonData=JSON.parse(data.data);
              console.log(jsonData);
               this.clientList=jsonData;
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
      this.clientList = this.clientList.filter((item) => {
        if(item.Name && item.Name !='')
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.getClientList();
    }
  }


  addClient(){
    this.navCtrl.push(AddClientPage);
  }

  editClient(selectedClient){
    console.log(selectedClient);
    this.navCtrl.push(AddClientPage,{client:selectedClient});
  }

}
