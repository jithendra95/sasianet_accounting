import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Memo } from '../../model/Memo';


import {Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';

import {MemoAutoCompleteProvider} from '../../providers/memo-auto-complete/memo-auto-complete';
import { Client } from '../../model/Client';

/**
 * Generated class for the AddMemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-memo',
  templateUrl: 'add-memo.html',
})
export class AddMemoPage {

  mode ='New';
  memo = {} as Memo;
  client={} as Client;
  timeDiffH=0;
  timeDiffMM=0;
  timeDiffSS=0;


  timeStart=0;
  interval:any;

  stopWatchStatus='start'

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public http: Http,public intProv:InterfaceProvider,
              public memoService:MemoAutoCompleteProvider) {

              this.startTimer();
  }

 

  startTimer(){

    this.timeDiffH=0;
    this.timeDiffMM=0;
    this.timeDiffSS=0;
    this.timeStart=0;
    this.stopWatchStatus='start';
    

    
    this.memo.Start_time=(new Date()).toLocaleTimeString();
    this.memo.Start_date=(new Date()).toDateString();
    this.timeStart=new Date().getTime();
    this.memo.End_time=(new Date()).toLocaleTimeString();


   this.interval = setInterval(()=>{
      this.memo.End_time=(new Date()).toLocaleTimeString();

   
        this.timeDiffSS=Math.round(((new Date().getTime() - this.timeStart)/1000))%60;
        this.timeDiffMM=Math.floor((Math.round(((new Date().getTime() - this.timeStart)/1000))/60)%60);
      
        this.timeDiffH=Math.floor(Math.round(((new Date().getTime() - this.timeStart)/1000))/(60*60));
   },60)
 }

 stopTimer (){
  clearInterval(this.interval);
  this.stopWatchStatus='stop';
 }
  

 saveMemo(){

  if(this.validateFields()){
    if(this.mode=='New'){
      this.memo.End_date=(new Date()).toDateString();
      this.memo.Id=this.client.Id;
      this.memo.Name=this.client.Name;
      this.createMemo();
    }
  }
 
}


 createMemo(){
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

        let postParams = this.memo;

        this.http.post(SERVICE_URL+"memo/save_memo?user_id="+email+"&connect_schema="+schema
                       ,postParams , options)
          .subscribe(data => {
            let jsonData=data.json();
            console.log(jsonData);

            this.intProv.presentToast("Memo added Successfully ");
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

clearFields(){
  this.memo.Id="";
  this.memo.Name="";
  this.memo.Memo="";
  this.memo.Start_date="";
  this.memo.Start_time="";
  this.memo.End_date="";
  this.memo.End_time="";

  this.startTimer();
}


validateFields()
{
  if(this.client.Id=='' || this.client.Id==null){
    this.intProv.presentToast('Please select a client ');
    return false;
  }else if(this.memo.Memo=='' || this.memo.Memo==null){
    this.intProv.presentToast('Please enter memo');
    return false;
  }else{
    return true;
  }
}

}
