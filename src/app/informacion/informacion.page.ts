import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import {AlertController} from "@ionic/angular";



@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit {

  constructor(private firestoreService: FirestoreService, private router: Router, public alertController: AlertController) { }

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

  
  //Mensaje de informacion
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Citas Peluquería',
      subHeader: 'Ventana de información',
      message: 'En está app web podrás crear una lista de citas de peluquería, aparte de poder navegar entre sus páginas.',
      buttons: ['OK']
    });

    await alert.present();
  }

}