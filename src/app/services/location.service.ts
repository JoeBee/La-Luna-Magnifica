import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs'; // Import BehaviorSubject and Observable

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  // BehaviorSubjects to hold the state
  private latitudeSubject = new BehaviorSubject<number | null>(null);
  private longitudeSubject = new BehaviorSubject<number | null>(null);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true); // Start as loading

  // Public observables for components to subscribe to
  public latitude$: Observable<number | null> = this.latitudeSubject.asObservable();
  public longitude$: Observable<number | null> = this.longitudeSubject.asObservable();
  public locationError$: Observable<string | null> = this.errorSubject.asObservable();
  public isLoadingLocation$: Observable<boolean> = this.loadingSubject.asObservable();

  // Flag to prevent multiple fetch attempts
  private hasFetched = false;

  constructor() {
    // Fetch location immediately when the service is instantiated
    this.fetchInitialLocation();
  }

  // Renamed method to reflect it's the initial fetch
  private async fetchInitialLocation(): Promise<void> {
    // Prevent fetching again if already attempted
    if (this.hasFetched) {
      return;
    }
    this.hasFetched = true; // Mark as attempted
    this.loadingSubject.next(true); // Ensure loading state is true
    this.errorSubject.next(null); // Clear previous errors

    const platform = Capacitor.getPlatform();

    try {
      let position: { latitude: number; longitude: number };

      if (platform === 'web') {
        position = await this.getWebLocation();
      } else {
        position = await this.getNativeLocation();
      }

      // Update subjects on success
      this.latitudeSubject.next(position.latitude);
      this.longitudeSubject.next(position.longitude);
      this.errorSubject.next(null); // Clear error on success

    } catch (error: any) {
      console.error('Failed to get location in service', error);
      // Update error subject on failure
      this.latitudeSubject.next(null); // Clear location on error
      this.longitudeSubject.next(null);
      this.errorSubject.next(error.message || 'Failed to retrieve location.');
    } finally {
      // Update loading subject when done
      this.loadingSubject.next(false);
    }
  }

  // Extracted web logic
  private getWebLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location [Web API]', error);
          let message = 'Failed to retrieve location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              message = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              message = "The request to get user location timed out.";
              break;
          }
          reject(new Error(message));
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true } // Added some options
      );
    });
  }

  // Extracted native logic
  private async getNativeLocation(): Promise<{ latitude: number; longitude: number }> {
    try {
      const permissionStatus = await Geolocation.checkPermissions();
      console.log('Initial Permission Status:', permissionStatus); // Log initial status

      if (permissionStatus.location !== 'granted' && permissionStatus.coarseLocation !== 'granted') {
        console.log('Requesting location permissions...'); // Log before requesting
        const requestStatus = await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });
        console.log('Permission Request Status:', requestStatus); // Log request result

        if (requestStatus.location !== 'granted' && requestStatus.coarseLocation !== 'granted') {
          throw new Error('Location permission denied.');
        }
      } else {
        console.log('Location permission already granted.'); // Log if already granted
      }

      console.log('Getting current position...'); // Log before getting position
      // Get current position with options
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Set a timeout (e.g., 10 seconds)
        maximumAge: 60000 // Accept cached position within 1 minute
      });
      console.log('Position received:', position); // Log the received position
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location [Capacitor]', error); // Log capacitor specific errors
      // Rethrow or handle specific errors as needed
      throw error; // Rethrow the error to be caught by fetchInitialLocation
    }
  }

  // Optional: Add a method to manually trigger a refresh if needed later
  public async refreshLocation(): Promise<void> {
    this.hasFetched = false; // Allow fetching again
    await this.fetchInitialLocation();
  }
}
