import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonLabel]
})
export class ReferencePage implements OnInit {

  // Documentation: 
  // https://ipgeolocation.io/astronomy-api.html#documentation-overview
  public referenceData = [
    // {
    //   "Field": "Date",
    //   "Description": "Provided or current date in the format 'yyyy-MM-dd'."
    // },
    // {
    //   "Field": "Current Time",
    //   "Description": "Current time of the extracted location in the format 'HH:mm:ss.SSS'."
    // },
    // --------------------------
    {
      "Field": "Moonrise",
      "Description": "Time at which moon rises at the extracted location in the format 'HH:mm'."
    },
    {
      "Field": "Moonset",
      "Description": "Time at which moon sets at the extracted location in the format 'HH:mm'."
    },
    {
      "Field": "Moon Status*",
      "Description": "Represents the moon rise and moon set status."
    },
    {
      "Field": "Moon Altitude",
      "Description": "The moon's altitude angle above the horizon at current_time, measured in degrees."
    },
    {
      "Field": "Moon Distance",
      "Description": "The distance from Earth to the moon at current_time, in kilometers."
    },
    {
      "Field": "Moon Azimuth",
      "Description": "The azimuth angle of the moon at current_time, indicating its compass direction in degrees."
    },
    {
      "Field": "Moon Parallactic Angle",
      "Description": "The angle between the celestial pole and the moon's position relative to the location, measured in degrees.",
    },
    {
      "Field": "Moon Phase",
      "Description": "The current phase of the moon (e.g., \"WAXING_CRESCENT\"), indicating its position in the lunar cycle."
    },
    {
      "Field": "Moon Illumination Percentage",
      "Description": "The percentage of the moon's surface that is illuminated by sunlight, as viewed from Earth."
    },
    {
      "Field": "Moon Angle",
      "Description": "The angular diameter of the moon as observed from Earth, measured in degrees."
    },
    // --------------------------
    {
      "Field": "Sunrise",
      "Description": "Time at which sun rises at the extracted location in the format 'HH:mm'."
    },
    {
      "Field": "Sunset",
      "Description": "Time at which sun sets at the extracted location in the format 'HH:mm'."
    },
    {
      "Field": "Sun Status*",
      "Description": "Represents the sun rise and sun set status."
    },
    {
      "Field": "Solar Noon",
      "Description": "The time of day when the sun is at its highest point in the sky, in the format 'HH:mm'."
    },
    {
      "Field": "Day Length",
      "Description": "The total length of daylight for the current day in format 'HH:mm', representing the time from sunrise to sunset."
    },
    {
      "Field": "Sun Altitude",
      "Description": "The sun's altitude angle above the horizon at current_time, measured in degrees."
    },
    {
      "Field": "Sun Distance",
      "Description": "The distance from Earth to the sun at current_time, in kilometers."
    },
    {
      "Field": "Sun Azimuth",
      "Description": "The azimuth angle of the sun at current_time, indicating its compass direction in degrees."
    }
    // --------------------------


  ];

  constructor() { }

  ngOnInit() {
  }

}
