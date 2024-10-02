import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReportService {

    constructor(private http: HttpClient) { }

    // Get all report
    getReports(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }
    // Post all report
    searchReports(url: string, requestData: any): Observable<any[]> {
        return this.http.post<any[]>(`/${url}`, requestData);
    }
    // Get a single report by ID
    getReportById(url: string, adId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${adId}`);
    }

    // Delete a report
    deleteReport(ids: any): Observable<any> {
        return this.http.post<any[]>(`/delete-product-report`, { report_id: ids });
    }
    // Update a report
    updateReport(report: any): Observable<any> {
        return this.http.post<any[]>(`/change-product-report-status`, report);
    }
}
