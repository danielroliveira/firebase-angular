import { Injectable, EventEmitter } from '@angular/core';

//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(public afAuth: AngularFireAuth) { }

  // fazerLogin(usuario: Usuario) {
  //   if(usuario.nome === 'daniel' && usuario.senha === '1234') {
  //     this.usuarioAutenticado = true
  //   } else {
  //     this.usuarioAutenticado = false
  //   }
  // }

  doLogin(usuario: Usuario){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
      .then(res => {
        // this.usuarioAutenticado = true;
        // this.mostrarMenuEmitter.emit(true);
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }

}
