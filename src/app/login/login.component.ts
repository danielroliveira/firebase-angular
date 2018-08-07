import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Usuario } from './../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  errorMessage: string = '';
  hide = true;
  usuario: Usuario = {nome: "", senha: ""};

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  fazerLogin(){
    this.authService.fazerLogin(this.usuario)
  }

}
