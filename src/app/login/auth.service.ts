import { Injectable, EventEmitter } from '@angular/core';

//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private afAuth: AngularFireAuth) { }

  doLogin(usuario: Usuario){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.password)
      .then(res => {
        this._usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        resolve(res);
      }, err => {
        this._usuarioAutenticado = false;
        this.mostrarMenuEmitter.emit(false);
        reject(err);
      })
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  usuarioAutenticado(){
    return this._usuarioAutenticado
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

}
