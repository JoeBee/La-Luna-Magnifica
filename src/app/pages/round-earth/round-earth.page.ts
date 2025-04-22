import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonList, IonItem } from '@ionic/angular/standalone';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { MoonService } from '../../services/moon.service';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-round-earth',
    templateUrl: './round-earth.page.html',
    standalone: true,
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonList, IonItem]
})
export class RoundEarthPage {
    moonData: any | null = null;
    moonDataError: string | null = null;
    isLoadingMoonData: boolean = false;
    imageUrl: string = 'assets/placeholder.jpg';

    latitude$: Observable<number | null>;
    longitude$: Observable<number | null>;
    locationError$: Observable<string | null>;
    isLoadingLocation$: Observable<boolean>;

    constructor(
        public locationService: LocationService,
        private moonService: MoonService
    ) {
        this.latitude$ = this.locationService.latitude$;
        this.longitude$ = this.locationService.longitude$;
        this.locationError$ = this.locationService.locationError$;
        this.isLoadingLocation$ = this.locationService.isLoadingLocation$;

        this.locationService.isLoadingLocation$.subscribe(isLoading => {
            console.log('* Round Earth: isLoadingLocation:', isLoading);
            this.fetchMoonData();
        });
    }

    fetchMoonData() {
        let currentLat: number | null = null;
        let currentLon: number | null = null;

        currentLat = this.locationService['latitudeSubject'].getValue();
        currentLon = this.locationService['longitudeSubject'].getValue();

        if (currentLat === null || currentLon === null) {
            const errorMsg = "Location not available to fetch moon data.";
            this.moonDataError = errorMsg;
            console.error(errorMsg, { lat: currentLat, lon: currentLon });
            this.locationService.locationError$.subscribe(err => {
                if (err) {
                    console.error("Location service error:", err);
                    this.moonDataError = `Cannot fetch moon data because location failed: ${err}`;
                }
            }).unsubscribe();
            return;
        }

        this.isLoadingMoonData = true;
        this.moonDataError = null;
        this.moonData = null;
        this.imageUrl = 'assets/placeholder.jpg';

        this.moonService.getMoonData(currentLat, currentLon).subscribe({
            next: (data) => {
                this.moonData = data;
                console.log('Moon Data:', this.moonData);
                if (this.moonData && this.moonData.moon_phase) {
                    const phaseFilename = this.moonData.moon_phase.toLowerCase()
                        .replace(/_/g, '-')
                        .replace(/ /g, '-')
                        .trim();
                    this.imageUrl = `assets/moon-phases/round-${phaseFilename}.png`;
                    console.log('* Image URL:', this.moonData.moon_phase, this.imageUrl);
                } else {
                    this.imageUrl = 'assets/placeholder.jpg';
                }
                this.isLoadingMoonData = false;
            },
            error: (error) => {
                console.error('Failed to get moon data', error);
                this.moonDataError = error.message || 'Failed to retrieve moon data.';
                this.isLoadingMoonData = false;
                this.imageUrl = 'assets/placeholder.jpg';
            }
        });
    }
} 