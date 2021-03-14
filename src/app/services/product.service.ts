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
   * get product list
   */
  getProductService() {
    return this.http.get(this.url);
  }

  /**
   * get product info by id
   * @param id 
   */
  getProductById(id) {
    return this.http.get(`${this.url}${id}`)
  }

  /**
   * delete product by id
   * @param id 
   */
  deleteProduct(id) {
    return this.http.delete(`${this.url}${id}`);
  }

  /**
   * update product info by id
   * @param product 
   */
  updateProduct(product: Product) {
    return this.http.put(`${this.url}${product.id}`, product);

  }

  /**
   * create new product 
   * @param product 
   */
  createProduct(product: Product) {
    return this.http.post(this.url, product);
  }
}
