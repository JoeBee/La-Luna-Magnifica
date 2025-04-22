import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-white-paper',
  templateUrl: './white-paper.page.html',
  styleUrls: ['./white-paper.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WhitePaperPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
