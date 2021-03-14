import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }



    /**
     * get user info by id
     * @param id 
     */
    getUser(id) {
        return this.http.get(`/api/Client/${id}`);
    }

    /**
     * create user
     * @param user 
     */
    createUser(user: Client) {

        return this.http.post('/api/Client/', user);
    }
    /**
     * edit user info
     * @param user 
     */
    editUser(user: Client) {
        return this.http.put(`/api/Client/${user.id}`, user);
    }
}
