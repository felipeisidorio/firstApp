import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiRussiaProvider {  
  //private url = "https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json";
  private url = "https://raw.githubusercontent.com/felipeisidorio/apiRussia/master/data.json";
  private local = "../assets/data/data.json";
  constructor(public http: HttpClient) {
    
  }
 
  getDados(source : string) : Observable<any>  { 
   if(source == 'LOCAL'){ 
      return this.http.get(this.local);
      
    }else{      
      return this.http.get(this.url);
    }
  }
  
}
