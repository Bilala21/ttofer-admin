import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdService {

    constructor(private http: HttpClient) { }

    // Get all ads
    getAds(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single ad by ID
    getAdById(url: string, product_id: number): Observable<any> {
        return this.http.post<any>(`/${url}`, { product_id });
    }

    // Delete a ad
    deleteAd(ids: any): Observable<any> {
        return this.http.post<any[]>(`/delete-product`, { product_id: ids });
    }
    // Update product status
    updateStatus(status: number, id: number, url: string): Observable<any> {
        return this.http.post<any>(`/${url}`, { product_id: id, status });
    }
    updateProduct(data: any, url: string): Observable<any> {
        return this.http.post(url, data);
    }
}
