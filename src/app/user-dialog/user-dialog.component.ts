import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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
  ) { 
  }
  
  ngOnInit() {

    if (this.data) {
      this.usuario = this.data.usuario;
    }
    // cria o formulario
    this.createForm();
    // adiciona a validacao do campo confirmacao
    this.userForm.get('confirmacao').setValidators(
      [
        Validators.required, Validators.minLength(6), Validators.maxLength(20),
        this.confirmacaoValidator
      ]
    )
  }

  createForm() {
    this.userForm = this.formbuilder.group({
      senhaAntiga: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      novaSenha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmacao: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  //Our custom validation
  confirmacaoValidator(control: AbstractControl): {[key: string]: boolean} | null  {

    var val: string = control.value;
    var nSenha = control.parent.get('novaSenha')

    if(val != nSenha.value) {
      return { 'confirmacao': true }
    }
    return null
  };
  
  onSubmit(){
    this.dialogRef.close(this.userForm.value)
  }

}
