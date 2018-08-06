import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientServiceProvider } from '../../providers/client-service/client-service';

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
    private storage:Storage,private cliService:ClientServiceProvider) {


    this.storage.get('email').then(email=>{
      this.storage.get('password').then(pass=>{
        this.storage.get('schema').then(schema=>{
          this.cliService.getClientList(email,schema,pass).then(result=>{
            //this.clientList=result;
          })
         });
       });
     });
  }

  

}
