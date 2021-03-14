import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  url = '/api/Products/';

  /***
   * 
   */
  getProductService(){
    return this.http.get(this.url);
  }

  /**
   * 
   * @param id 
   */
  deleteProduct(id){
    return this.http.delete(`${this.url}${id}`);
  }
  /**
   * 
   * @param product 
   */
  updateProduct(product){
    return this.http.put(this.url, product);

  }
}
