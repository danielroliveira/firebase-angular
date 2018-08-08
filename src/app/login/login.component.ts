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
  usuario = new Usuario

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

  // fazerLogin(){
  //   this.authService.fazerLogin(this.usuario)
  // }

  tryLogin(){
    this.authService.doLogin(this.usuario)
    .then(res => {
      this.router.navigate(['/tarefas']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
