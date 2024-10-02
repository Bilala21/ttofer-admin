import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl = 'https://your-backend-api-url/api/users';

    constructor(private http: HttpClient) { }

    // Create a new user
    // createUser(userData: any): Observable<any> {
    //     return this.http.post(`${this.apiUrl}`, userData);
    // }

    // Get all users
    getUsers(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single user by ID
    getUserById(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}`);
    }

    // Update a user
    // updateUser(userId: number, updatedData: any): Observable<any> {
    //     return this.http.put(`${this.apiUrl}/${userId}`, updatedData);
    // }

    // Delete a user
    deleteUser(ids: any): Observable<any> {
        return this.http.get(`/users/delete?user_ids=${ids}`);
    }
}
