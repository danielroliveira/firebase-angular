import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  usuario: Usuario;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UserDialogComponent>, //fazer referencia ao dialog para fechar
  ) { }

  ngOnInit() {
    if (this.data) {
      this.usuario = this.data.usuario;
    }
  }

}
