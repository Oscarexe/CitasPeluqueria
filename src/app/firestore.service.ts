import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore,
              private angularFireStorage: AngularFireStorage) { 
  }

  public insertar(coleccion, datos) {
    return this.angularFirestore.collection(coleccion).add(datos);
  } 

  public consultar(coleccion) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }
  
  public borrar(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).delete();
  }

  public actualizar(coleccion, documentId, datos) {
    return this.angularFirestore.collection(coleccion).doc(documentId).set(datos);
  }

  public consultarPorId(coleccion, documentId) {
    return this.angularFirestore.collection(coleccion).doc(documentId).snapshotChanges();
  }
 
  //operaciones con Firebase, en este caso para poder subir una imagen al Storage
  public uploadImage (imagenes, imagen, imagenBase64){
    let storageRef = 
      this.angularFireStorage.ref(imagenes).child(imagen);
        return storageRef.putString("data:image/jpeg;base64," + imagenBase64, 'data_url');
  }

  //permitirá eliminar un determinado archivo del Storage a partir de su URL de descarga
  public deleteFileFromURL(fileURL){
    return this.angularFireStorage.storage.refFromURL(fileURL).delete();
  }

  
}