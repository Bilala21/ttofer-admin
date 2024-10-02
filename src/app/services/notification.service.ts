import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {

    constructor(private http: HttpClient) { }

    // Get all Notification
    getNotification(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single Notification by ID
    getNotificationById(url: string, msgId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${msgId}`);
    }
    // Get a single Notification by ID
    getMessageByConversationId(url: string, msgId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${msgId}`);
    }

    // Delete a Notification
    deleteMessage(ids: any): Observable<any> {
        return this.http.get(`/latest-messages/delete?messages_id[${ids}]`);
    }
}
