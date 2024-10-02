import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TeamMemberService {

    constructor(private http: HttpClient) { }

    // Get all team member
    getTeamMember(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single team member by ID
    getTeamMemberById(url: string, adId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${adId}`);
    }

    // Delete a team member
    deleteTeamMember(ids: any): Observable<any> {
        return this.http.get(`/users/delete?user_ids=${ids}`);
    }
}
