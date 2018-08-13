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
    private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  tryLogin() {
    this.authService.doLogin(this.loginForm.value)
      .then(res => {
        this.router.navigate(['/tarefas']);
      }, err => {
        this.errorMessage = err.message;
      })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.tryLogin()
    }
  }

  getErrorMessage(campo) {
    if (campo === this.loginForm.get('email')) {
      return campo.hasError('required') ? 'Entre com o e-mail' :
        campo.hasError('email') ? 'Entre com um Email válido' :
          '';
    } else if (campo === this.loginForm.get('password')) {
      return campo.hasError('required') ? 'Entre com a Senha' :
        campo.hasError('minlength') ? 'Entre com uma Senha válida' :
          '';
    }
  }

}
