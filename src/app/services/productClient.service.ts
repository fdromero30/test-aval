import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductClient } from '../models/productClient.model';

@Injectable({
    providedIn: 'root'
})
export class ProducClientService {

    constructor(private http: HttpClient) { }


    url = '/api/ProductsClient/';

    /**
     * buy product for client
     * @param productClient 
     */
    buyProduct(productClient: ProductClient) {
        return this.http.post(this.url, productClient);
    }
}
