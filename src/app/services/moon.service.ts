import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class MoonService {
    private apiKey = 'd2a59281c47e498c92be91320eafa408';
    private apiUrl = 'https://api.ipgeolocation.io/astronomy';

    constructor(private http: HttpClient) { }

    getMoonData(latitude: number, longitude: number) {
        const url = `${this.apiUrl}?apiKey=${this.apiKey}&lat=${latitude}&long=${longitude}`;
        return this.http.get(url);
    }
}
