import {AutoCompleteService} from 'ionic2-auto-complete';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


import {SERVICE_URL} from '../../app/app.config';
import { HTTP } from '@ionic-native/http';

/*
  Generated class for the MemoAutoCompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoAutoCompleteProvider implements AutoCompleteService {

  labelAttribute = "Name";
  formValueAttribute = ""
  clientList =[];
    constructor(private http:HTTP,private storage:Storage) {
    
    }


    async getResults(keyword:string) {
      /*return this.http.get("https://restcountries.eu/rest/v1/name/"+keyword)
        .map(
          result =>
          {
            return result.json()
              .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()) )
          });*/

          /* this.storage.get('email').then(async email=>{
              this.storage.get('token').then(async token=>{
                this.storage.get('schema').then( async schema=>{
                var headers = new Headers();
                headers.append("Accept", 'application/json');
                headers.append('Content-Type', 'application/json' );
                headers.append('Authorization', 'Basic ' +token);
                let options = new RequestOptions({ headers: headers });
             
                
                 await this.http.get(SERVICE_URL+"client/get_client_list?user_id="+email+"&connect_schema="+schema
                                   , options)
                  .subscribe(result =>
                    {
                      console.log(result)
                      return result.json()
                                      .filter(item => item.Name.toLowerCase().startsWith(keyword.toLowerCase()) )
                      
                    },error=>{
                      console.log(error)
                    });
                })
               });
             });
             
     }
             */
            this.getClientList();
             console.log(this.clientList
              .filter(item => item.Name.toLowerCase().startsWith(keyword.toLowerCase()) ))


             return this.clientList
             .filter(item => item.Name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 )

       
    }

   


     getClientList(){
      
   
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


             this.http.get(SERVICE_URL+"client/get_client_list?user_id="+email+"&connect_schema="+schema,''
                                , headers)
               .then(data => {
                  let jsonData=JSON.parse(data.data);
                  this.clientList=jsonData;
                  
                  
                }, error => {
                 
                 console.log(error);// Error getting the data
                 //return error;
               });
             })
            });
          });
        
     }
}
