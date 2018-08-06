import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
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
    private storage:Storage,public http: Http,public intProv:InterfaceProvider) {

   this.getClientList();
   
  }

  

  async getClientList(){
   

    this.storage.get('email').then(email=>{
      this.storage.get('token').then(token=>{
        this.storage.get('schema').then( schema=>{
          var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          headers.append('Authorization', 'Basic ' +token);
          let options = new RequestOptions({ headers: headers });
       
          /*let getParams = {
            user_id: userId,
            connect_schema :schema
          }*/
          let loader=this.intProv.presentLoading();
          loader.present();
          this.http.get(SERVICE_URL+"client/get_client_list?user_id="+email+"&connect_schema="+schema
                             , options)
            .subscribe(data => {
              let jsonData=data.json();
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
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.getClientList();
    }
  }


}
