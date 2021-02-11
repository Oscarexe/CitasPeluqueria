import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { FirestoreService } from '../firestore.service';
import {AlertController} from "@ionic/angular";





@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private firestoreService: FirestoreService, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
  }
  
  

  //NAVEGACIONES
  navigateToInicio() {
    this.router.navigate(["/inicio"]);
  }
  navigateToInformacion() {
    this.router.navigate(["/informacion"]);
  }
  navigateToMapa() {
    this.router.navigate(["/mapa"]);
  }


  //Mensaje de inicio
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
