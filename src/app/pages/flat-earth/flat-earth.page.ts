import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { LocationService } from '../../services/location.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MoonService } from '../../services/moon.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-flat-earth',
    templateUrl: './flat-earth.page.html',
    standalone: true,
    imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonNote],
    providers: [DecimalPipe]
})
export class FlatEarthPage {
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
        private moonService: MoonService,
        private decimalPipe: DecimalPipe
    ) {
        this.latitude$ = this.locationService.latitude$;
        this.longitude$ = this.locationService.longitude$;
        this.locationError$ = this.locationService.locationError$;
        this.isLoadingLocation$ = this.locationService.isLoadingLocation$;

        this.locationService.isLoadingLocation$.subscribe(isLoading => {
            console.log('* Flat Earth: isLoadingLocation:', isLoading);
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
                    const formattedMoonAltitude = this.decimalPipe.transform(this.moonData.moon_altitude, '1.2-2');
                    const formattedSunAltitude = this.decimalPipe.transform(this.moonData.sun_altitude, '1.2-2');
                    const formattedSunAzimuth = this.decimalPipe.transform(this.moonData.sun_azimuth, '1.2-2');
                    const formattedMoonParallacticAngle = this.decimalPipe.transform(this.moonData.moon_parallactic_angle, '1.2-2');
                    const formattedMoonAzimuth = this.decimalPipe.transform(this.moonData.moon_azimuth, '1.2-2');
                    const formattedMoonDistance = this.decimalPipe.transform(this.moonData.moon_distance, '1.0-0');
                    const formattedMoonAngle = this.decimalPipe.transform(this.moonData.moon_angle, '1.2-2');
                    const formattedSunDistance = this.decimalPipe.transform(this.moonData.sun_distance, '1.0-0');

                    this.moonData.display_moonset = `${this.moonData.moonset}, slips off the edge again`;
                    this.moonData.display_moonrise = `Creeps up over the edge at ${this.moonData.moonrise} sharp`;
                    this.moonData.display_moon_status = this.moonData.moon_altitude < 0 ? `Wobbling near the ceiling fan` : `Blessing the underworld`;
                    this.moonData.display_moon_phase = `Pancake is mid flip`;
                    this.moonData.display_moon_distance = ` ${formattedMoonDistance} km +/- ∞`;
                    this.moonData.display_moon_parallactic_angle = `${formattedMoonParallacticAngle}°`;
                    this.moonData.display_sun_azimuth = `${formattedSunAzimuth}° clockwise from the nearest waffle stand`;
                    this.moonData.display_moon_azimuth = `${formattedMoonAzimuth}°`;
                    this.moonData.display_moon_angle = `${formattedMoonAngle}°`;
                    this.moonData.display_sun_distance = `${formattedSunDistance} km +/- ∞`;
                    this.moonData.display_moon_altitude = this.moonData.moon_altitude && this.moonData.moon_altitude < 0 ? ` ${formattedMoonAltitude}° Under the table` : ` ${formattedMoonAltitude}° Over the buffet`;
                    this.moonData.display_sun_altitude = this.moonData.sun_altitude && this.moonData.sun_altitude < 0 ? ` ${formattedSunAltitude}° Apollo taking a break` : ` ${formattedSunAltitude}° Apollo hard at work`;
                    this.moonData.display_sunset = `${this.moonData.sunset}, then we're on the B side`;
                    this.moonData.display_sunrise = `${this.moonData.sunrise}, A side`;

                    const phaseFilename = this.moonData.moon_phase.toLowerCase()
                        .replace(/_/g, '-').replace(/ /g, '-')
                        .trim();
                    this.imageUrl = `assets/moon-phases/flat-${phaseFilename}.png`;
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