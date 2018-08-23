import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-acao-dialog',
  templateUrl: './acao-dialog.component.html',
  styleUrls: ['./acao-dialog.component.scss']
})

export class AcaoDialogComponent {
  
  titulo: string = ''
  texto: string = ''

  constructor(
    public dialogRef: MatDialogRef<AcaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data)
    {
      this.titulo = data.titulo;
      this.texto = data.texto;
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}