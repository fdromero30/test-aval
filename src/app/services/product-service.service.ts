import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }



  getProductService(){

    return this.http.get('https://localhost:5001/api/Product/');

  }
}
