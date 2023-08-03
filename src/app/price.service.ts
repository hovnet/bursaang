import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  CurrentValueUrl:string = 'http://localhost:8080/CurrentProp';
  AlltValueUrl:string = 'http://localhost:8080/AllProps';
  YahooUrl:string = 'http://localhost:8080/yahoo';
  // returnvalue:any=null;
  constructor(private http: HttpClient) { }

  ngOnInit(){}

  getname(){
    return this.http.get<any>(this.CurrentValueUrl);
  }

  getCurrentprice(stock:any) {
    return this.http.get<any>(this.CurrentValueUrl + '?stock=' + stock);
    //YahooUrl
  }
  
  GetAllPrices(stock:any) {
    return this.http.get<any>(this.AlltValueUrl + '?stock=' + stock);

  }

  GetAllYPrices(stock:any) {
    return this.http.get<any>(this.YahooUrl + '?stock=' + stock);

  }

  // GetCharData(stock:any) {
  //   return this.http.get<any>(this.AlltValueUrl + '?stock=' + stock);
  // }
}
