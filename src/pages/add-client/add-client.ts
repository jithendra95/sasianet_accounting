import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Client } from '../../model/Client';



import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { Network } from '@ionic-native/network';
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
              public storage:Storage,public http: HTTP,public intProv:InterfaceProvider,
              private network:Network) {

                if(this.navParams.get('client')!=null){
                  this.client=this.navParams.get('client');
                  this.mode='Edit'
                } 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  saveClient(){

    if(this.validateFields()){
      if(this.mode=='New'){
        this.createClient();
      }else{
        this.editClient();
      }
    }
   
  }


  createClient(){
    this.storage.get('email').then(email=>{
      this.storage.get('token').then(token=>{
        this.storage.get('schema').then( schema=>{
         /* var headers = new Headers();
          headers.append("Accept", 'application/json');
          headers.append('Content-Type', 'application/json' );
          headers.append('Authorization', 'Basic ' +token);
          let options = new RequestOptions({ headers: headers });**/
       
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

          let getParams = this.client;

          this.http.post(SERVICE_URL+"client/save_client?user_id="+email+"&connect_schema="+schema
                         ,getParams , headers)
            .then(data => {
              let jsonData=JSON.parse(data.data);
              console.log(jsonData);

              this.intProv.presentToast("Client added Successfully "+jsonData.Id);
              this.clearFields();
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


  editClient(){
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

          let headers={'Accept': 'application/json',
              'Authorization': 'Basic ' + token
              }
          this.http.setDataSerializer('json');


          let loader=this.intProv.presentLoading();
          loader.present();

          let getParams = this.client;

          this.http.post(SERVICE_URL+"client/modify_client?user_id="+email+"&connect_schema="+schema
                         ,getParams , headers)
            .then(data => {
              let jsonData=JSON.parse(data.data);
              console.log(jsonData);

              this.intProv.presentToast("Client edited Successfully "+jsonData.Id);
              this.clearFields();
              loader.dismiss();
              this.navCtrl.pop();
               
             }, error => {
               loader.dismiss();
              console.log(error);// Error getting the data
              //return error;
            });
          })
         });
       });
  }
  clearFields(){
    this.client.Address='';
    this.client.City='';
    this.client.Contry='';
    this.client.Credit_period='';
    this.client.Id='';
    this.client.Name='';
    this.client.Tel_no='';
    this.client.Vat_no='';
  }

  validateFields()
  {
    if(this.client.Name=='' || this.client.Name==null){
      this.intProv.presentToast('Please enter client Name');
      return false;
    }else if(this.client.Address=='' || this.client.Address==null){
      this.intProv.presentToast('Please enter client Address');
      return false;
    }else{
      return true;
    }
  }


  
}
