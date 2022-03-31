import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    enviorement = 'http://localhost:3000/api/v1'

    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.enviorement}/users`)
    }

    deleteUser(userId: string): Observable<Object> {
        return this.http.delete<Object>(`${this.enviorement}/users/${userId}`)
    }
}