import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Memo } from '../../model/Memo';


import {Http,Headers,RequestOptions } from '@angular/http';
import {SERVICE_URL} from '../../app/app.config';
import { InterfaceProvider } from '../../providers/interface/interface';
import { Storage } from '@ionic/storage';

import {MemoAutoCompleteProvider} from '../../providers/memo-auto-complete/memo-auto-complete';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storage:Storage,public http: Http,public intProv:InterfaceProvider,
              public memoService:MemoAutoCompleteProvider) {

              
  }

  ionViewDidLoad() {
    
  }

}
