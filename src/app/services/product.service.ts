import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  url = '/api/Products/';

  /***
   * 
   */
  getProductService() {
    return this.http.get(this.url);
  }

  /**
   * 
   * @param id 
   */
  getProductById(id) {
    return this.http.get(`${this.url}${id}`)
  }

  /**
   * 
   * @param id 
   */
  deleteProduct(id) {
    return this.http.delete(`${this.url}${id}`);
  }

  /**
   * 
   * @param product 
   */
  updateProduct(product: Product) {
    return this.http.put(`${this.url}${product.id}`, product);

  }

  /**
   * 
   * @param product 
   */
  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
}
