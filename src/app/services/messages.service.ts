import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MessageService {

    constructor(private http: HttpClient) { }

    // Get all Messages
    getMessages(url: string): Observable<any[]> {
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
    deleteMessage(ids: any): Observable<any> {
        return this.http.get(`/latest-messages/delete?messages_id[${ids}]`);
    }
}
