import { Injectable } from '@angular/core';

import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;

  constructor() { }

  fazerLogin(usuario: Usuario) {
    if(usuario.nome === 'daniel' && usuario.senha === '1234') {
      this.usuarioAutenticado = true
    } else {
      this.usuarioAutenticado = false
    }
  }

}
