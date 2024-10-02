import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BoostingService {

    constructor(private http: HttpClient) { }

    // Get all Messages
    getBoosting(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single Messages by ID
    getMessageById(url: string, msgId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${msgId}`);
    }
    // Get a single Messages by ID
    getMessageByConversationId(url: string, msgId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${msgId}`);
    }

    // Delete a report
    deleteBoosting(ids: any): Observable<any> {
        return this.http.post("/delete-product", { product_id: ids });
    }
}
