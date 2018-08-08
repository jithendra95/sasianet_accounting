import { Http,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import {SERVICE_URL} from '../../app/app.config';
import 'rxjs/add/operator/map';
/*
  Generated class for the ClientServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientServiceProvider {

  constructor(public http: Http)  {
    console.log('Hello ClientServiceProvider Provider');
  }


     async getClientList(userId,schema,token) {
    
        
    
    
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json' );
        headers.append('Authorization', 'Basic ' +token);
        let options = new RequestOptions({ headers: headers });
     
        /*let getParams = {
          user_id: userId,
          connect_schema :schema
        }*/
        
        this.http.get(SERVICE_URL+"client/get_client_list?user_id="+userId+"&connect_schema="+schema
                           , options)
          .subscribe(data => {
            console.log(data['_body']);
            return data;
           }, error => {
            console.log(error);// Error getting the data
            return error;
          });
      }
}
