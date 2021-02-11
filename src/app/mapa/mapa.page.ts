import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  constructor(private firestoreService: FirestoreService, private router: Router) { }

  ngOnInit() {
  }
  
  

  //NAVEGACIONES
  navigateToInicio() {
    this.router.navigate(["/home"]);
  }
  navigateToInformacion() {
    this.router.navigate(["/informacion"]);
  }
  navigateToMapa() {
    this.router.navigate(["/mapa"]);
  }

}