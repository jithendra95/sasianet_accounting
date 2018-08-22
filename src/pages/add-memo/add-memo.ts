import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Memo } from '../../model/Memo';



import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';

import {MemoAutoCompleteProvider} from '../../providers/memo-auto-complete/memo-auto-complete';
import { Client } from '../../model/Client';

import { HTTP } from '@ionic-native/http';
import { Platform } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';



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
  timeDiffH= 0; 
  timeDiffMM=0;
  timeDiffSS=0;


  timeStart=0;
  interval:any;
  isIOS=false;
  imageUrl:any;


  stopWatchStatus='stop'
  displayImgUrl =[];
  dataImgUrl =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public http: HTTP,public intProv:InterfaceProvider,
              public memoService:MemoAutoCompleteProvider,public plt: Platform,
              public httpNew :Http,public transfer:FileTransfer) {

              //this.startTimer();

              if (this.plt.is('ios')) {
                this.isIOS=true;
              }
              
  }

 
  
  startTimer(){

   /* this.timeDiffH=0;
    this.timeDiffMM=0;
    this.timeDiffSS=0;
    this.timeStart=0;*/
    this.stopWatchStatus='start';
    

    let date=new Date()
    this.memo.Start_time=(("0"+date.getHours()).slice(-2) + ':' + ("0"+date.getMinutes()).slice(-2)+ ':' +("0"+date.getSeconds()).slice(-2));
    this.memo.Start_date=("0"+date.getDate()).slice(-2) +'-'+("0"+(date.getMonth() + 1)).slice(-2) +'-'+date.getFullYear();

    this.timeStart=new Date().getTime();
    


    console.log(this.memo.Start_date);

   this.interval = setInterval(()=>{
     
      let date=new Date()
      this.memo.End_time=(("0"+date.getHours()).slice(-2) + ':' + ("0"+date.getMinutes()).slice(-2)+ ':' +("0"+date.getSeconds()).slice(-2));
   
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

  console.log(this.client)
  if(this.validateFields()){
    if(this.mode=='New'){
     
      let date=new Date()
      this.memo.End_date=("0"+date.getDate()).slice(-2) +'-'+("0"+(date.getMonth() + 1)).slice(-2) +'-'+date.getFullYear()
      

      
      this.memo.Name=this.client.Id;
      this.createMemo();
    }
  }
 
}


 createMemo(){
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

        let postParams = this.memo;

        this.http.post(SERVICE_URL+"memo/save_memo?user_id="+email+"&connect_schema="+schema
                       ,postParams , headers)
          .then(data => {
            let jsonData=JSON.parse(data.data);
            console.log(jsonData);

            this.intProv.presentToast("Memo added Successfully "+jsonData.Id);
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
  this.memo.Id="";
  this.memo.Name="";
  this.memo.Memo="";
  this.memo.Start_date="";
  this.memo.Start_time="";
  this.memo.End_date="";
  this.memo.End_time="";
  this.memo.File_seq_list=[String];
  this.displayImgUrl =[];
  this.dataImgUrl =[];
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


public onFileFromStorageChosen(filesEvent: any) {
  this.processFileFromStorage(filesEvent);
}

public processFileFromStorage(event: any) {
  let file = event.target.files[0];
  //you can read various properties of the file (like mimetype and size) from the file object.
  var ext = file.name.substr(file.name.lastIndexOf('.') + 1);
  console.log(file);
  if(ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='png' || ext.toLowerCase()=='gif'
     || ext.toLowerCase()=='doc' || ext.toLowerCase()=='docx' 
     || ext.toLowerCase()=='xls' || ext.toLowerCase()=='xlsx'
     || ext.toLowerCase()=='pdf'){
    this.readfile(file);
  }else{
     this.intProv.presentToast('This file type is not allowed');
  }
  
}

//this one reads the contents of the file as a URL that contains its data:

public readfile(file: any): void {
  let reader = new FileReader();
  var ext = file.name.substr(file.name.lastIndexOf('.') + 1);

  
  reader.onload = async (e) => {
    
     
    let dataUrl = reader.result;
    let imgBlob=new Blob([reader.result], {type: file.type});
    //and do something with the reader.
    //console.log(dataUrl)
    this.imageUrl=dataUrl;

    this.uploadImage(file.name,dataUrl);
    //console.log(dataUrl);

     
    try{
      //this.memo.File_seq.push({'file':file,'imgBlob':imgBlob});
      this.dataImgUrl.push(dataUrl);
      if(ext.toLowerCase()=='jpeg' || ext.toLowerCase()=='jpg' || ext.toLowerCase()=='png' || ext.toLowerCase()=='gif'){
        this.displayImgUrl.push({'img':dataUrl,'data':dataUrl});
      }else if(ext.toLowerCase()=='doc' || ext.toLowerCase()=='docx' ){
        this.displayImgUrl.push({'img':'assets/imgs/doc.png','data':dataUrl});
      }else if(ext.toLowerCase()=='xls' || ext.toLowerCase()=='xlsx' ){
        this.displayImgUrl.push({'img':'assets/imgs/xls.png','data':dataUrl});
      }else if(ext.toLowerCase()=='pdf'){
        this.displayImgUrl.push({'img':'assets/imgs/pdf.jpg','data':dataUrl});
      }
      
    }catch(e){
      ///this.memo.File_seq=[{'file':file,'imgBlob':imgBlob}];
      this.dataImgUrl.push(dataUrl);
      if(ext.toLowerCase()=='jpeg' ||ext.toLowerCase()=='jpg' || ext.toLowerCase()=='png' || ext.toLowerCase()=='gif'){
        this.displayImgUrl.push({'img':dataUrl,'data':dataUrl});
      }else if(ext.toLowerCase()=='doc' || ext.toLowerCase()=='docx' ){
        this.displayImgUrl.push({'img':'assets/imgs/doc.png','data':dataUrl});
      }else if(ext.toLowerCase()=='xls' || ext.toLowerCase()=='xlsx' ){
        this.displayImgUrl.push({'img':'assets/imgs/xls.png','data':dataUrl});
      }else if(ext.toLowerCase()=='pdf'){
        this.displayImgUrl.push({'img':'assets/imgs/pdf.jpg','data':dataUrl});
      }
      
    }
    
  };
  reader.readAsDataURL(file);
}


removeImage(image){
  const index: number = this.dataImgUrl.indexOf(image);
    if (index !== -1) {
        this.memo.File_seq_list.splice(index, 1);
        this.displayImgUrl.splice(index, 1);
        this.dataImgUrl.splice(index, 1);
    } 
}



uploadImage(fileName,imageURL){


  this.storage.get('email').then(email=>{
    this.storage.get('token').then(token=>{
      this.storage.get('schema').then( schema=>{
        this.storage.get('client_id').then( client_id=>{
        let loader=this.intProv.presentLoading();
        loader.present();

        let headers={'Accept': 'application/json',
        'Authorization': 'Basic ' + token
        }
        this.http.setDataSerializer('json');

        let postParams = {image:imageURL};

        this.http.post(SERVICE_URL+"memo/upload_docs?user_id="+email+"&connect_schema="+schema+
                       "&fileName="+fileName+"&client_id="+client_id
                       ,postParams , headers)
          .then(data => {

            try{
              this.memo.File_seq_list.push(data.data);
              console.log(this.memo.File_seq_list);
            }catch(e){
              this.memo.File_seq_list = [data.data];
              console.log(this.memo.File_seq_list);
            }

            loader.dismiss();
            
             
           }, error => {
             loader.dismiss();
             console.log(error);
            
          });
        })
       });
     });
   });  

  
}




     

}
