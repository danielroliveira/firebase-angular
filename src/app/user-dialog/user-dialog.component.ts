import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  usuario: Usuario;
  hide: boolean = true;
  userForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UserDialogComponent>, //fazer referencia ao dialog para fechar
    private formbuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data) {
      this.usuario = this.data.usuario;
    }
    this.createForm();
  }

  createForm() {
    this.userForm = this.formbuilder.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      novaSenha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  onSubmit(){
    console.log('alterar a senha')
  }

}
