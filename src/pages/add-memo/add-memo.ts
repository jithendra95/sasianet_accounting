import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Memo } from '../../model/Memo';


import {Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';

import {MemoAutoCompleteProvider} from '../../providers/memo-auto-complete/memo-auto-complete';
import { Observable } from 'rxjs';
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
  timeDiffH=0;
  timeDiffMM=0;
  timeDiffSS=0;

  timeStart=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public http: Http,public intProv:InterfaceProvider,
              public memoService:MemoAutoCompleteProvider) {

              this.memo.Start_time=(new Date()).toLocaleTimeString();
              this.timeStart=new Date().getTime();
              this.memo.End_time=(new Date()).toLocaleTimeString();

              
              
              
              Observable.interval(1*60).subscribe(x=>{
                this.memo.End_time=(new Date()).toLocaleTimeString();
                this.timeDiffSS=Math.round(((new Date().getTime() - this.timeStart)/1000));
              })
  }

  ionViewDidLoad() {
    
  }

}
