import { Injectable, EventEmitter } from '@angular/core';

//import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Usuario } from './../models/usuario.model';
import { reject } from 'q';
import { error } from 'protractor';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private afAuth: AngularFireAuth) { }

  doLogin(usuario: Usuario) {
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

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  // changeCurrentUserPass(currentUserEmail: string, oldPass: string, newPass: string): { resultado: boolean, motivo: string } | any {

  //   //verifica a senha antiga
  //   firebase.auth().signInWithEmailAndPassword(currentUserEmail, oldPass)
  //     .then(
  //       dados => {
  //         if (dados) {
  //           return { resultado: true, motivo: ''}
  //         }
  //       }, err => {
  //         if (err.code === 'auth/wrong-password') {
  //           return { resultado: false, motivo: 'senha errada'}
  //         }
  //       }
  //     )

  //   // altera a senha
  //   // return new Promise<any>((resolve, reject) => {
  //   //   var user = firebase.auth().currentUser.updatePassword(newPass).then(() => resolve(user))
  //   // })

  // }

  // VERIFICA A SENHA ATUAL DO CURRENT USER
  verificaUsuarioSenha(currentUserEmail: string, oldPass: string): Promise<any>{
    //verifica a senha antiga
    return firebase.auth().signInWithEmailAndPassword(currentUserEmail, oldPass)
      .then(
        dados => {
          if (dados) {
            return { resultado: true, motivo: ''}
          }
        }, err => {
          if (err.code === 'auth/wrong-password') {
            return { resultado: false, motivo: 'senha errada'}
          }
        }
      )
  }

  // ALTERA A SENHA DO USUARIO ATUAL
  changeCurrentUserPass(newPass: string): Promise<any> {
    //altera a senha
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser.updatePassword(newPass)
        .then(() => resolve(user))
        .catch(() => reject())
    })
  }

  updateCurrentUserProfile() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

}

