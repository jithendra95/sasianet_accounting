import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../model/Client';


import {Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClientPage {

  mode ='New';
  client = {} as Client;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public http: Http,public intProv:InterfaceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  saveClient(){

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

          let getParams = {
            client: this.client
          }

          this.http.post(SERVICE_URL+"client/save_client?user_id="+email+"&connect_schema="+schema
                         ,getParams , options)
            .subscribe(data => {
              let jsonData=data.json();
              console.log(jsonData);
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