import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BannerService {

    constructor(private http: HttpClient) { }

    // Post a new banner
    createBanners(url: string, bannerData: any): Observable<any> {
        return this.http.post<any>(`/${url}`, bannerData);
    }

    // Update an existing banner
    updateBanners(url: string, bannerData: any): Observable<any> {
        return this.http.post<any>(`/${url}`, bannerData);
    }

    getBanners(url: string): Observable<any[]> {
        return this.http.get<any[]>(`/${url}`);
    }

    // Get a single banners by ID
    getBannerById(url: string, adId: number): Observable<any> {
        return this.http.get<any>(`/${url}/${adId}`);
    }

    // Delete a banners
    deleteBanner(ids: any): Observable<any> {
        return this.http.get(`/delete-banners?banner_ids=${ids}`);
    }
}
