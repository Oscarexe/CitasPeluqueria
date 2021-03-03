import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Cita } from '../citas';
import { Router } from '@angular/router';
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';




//Definicion del parametro a pasar para mostrar el registro
//Le estamos diciendo que el ‘path’ hacia ‘user’ ahora puede llevar un id,
//y por lo tanto debemos manejarlo en el controlador correspondiente (user.page.ts)
const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "cita/:id", loadChildren: "./cita/cita.module#UserPageModule" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  arrayColeccionCitas: any = [{
    id: "",
    data: {} as Cita
   }];

  citaEditando: Cita;  

  constructor(private firestoreService: FirestoreService, private router: Router) {
    //Crear una cita vacia
    this.citaEditando = {} as Cita;
    this.obtenerListaCitas();
  } 
  
  clicBotonInsertar() {
    this.firestoreService.insertar("citas", this.citaEditando).then(() => {
      console.log('Jugador creado correctamente!');
      this.citaEditando= {} as Cita;
    }, (error) => {
      console.error(error);
    });
  }
  
  obtenerListaCitas(){
    this.firestoreService.consultar("citas").subscribe((resultadoConsultaCitas) => {
      this.arrayColeccionCitas = [];
      resultadoConsultaCitas.forEach((datosCita: any) => {
        this.arrayColeccionCitas.push({
          id: datosCita.payload.doc.id,
          data: datosCita.payload.doc.data()
        });
      })
    });
  }


  idCitaSelec: string;

  selecCita(citaSelec) {
    console.log("Tarea seleccionada: ");
    console.log(citaSelec);
    this.idCitaSelec = citaSelec.id;
    this.citaEditando.nombre = citaSelec.data.nombre;
    this.citaEditando.numeroTlf = citaSelec.data.numeroTlf;
    this.citaEditando.dia = citaSelec.data.dia;    
    //navegar a la cita
    this.router.navigate(["/cita/" + this.idCitaSelec]);


  }

  //NAVEGACIONES
  navigateToCita() {
    this.router.navigate(["/cita/nuevo"]);
  }
  navigateToInicio() {
    this.router.navigate(["/home"]);
  }
  navigateToInformacion() {
    this.router.navigate(["/informacion"]);
  }
  navigateToMapa() {
    this.router.navigate(["/mapa"]);
  }



  clicBotonBorrar() {
    this.firestoreService.borrar("citas", this.idCitaSelec).then(() => {
      // Actualizar la lista completa
      this.obtenerListaCitas();
      // Limpiar datos de pantalla
      this.citaEditando = {} as Cita;
    })
  }

  clicBotonModificar() {
    this.firestoreService.actualizar("citas", this.idCitaSelec, this.citaEditando).then(() => {
      // Actualizar la lista completa
      this.obtenerListaCitas();
      // Limpiar datos de pantalla
      this.citaEditando = {} as Cita;
    })
  }



}