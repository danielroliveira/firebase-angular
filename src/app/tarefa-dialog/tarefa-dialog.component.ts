import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

import { TarefaService } from '../tarefa.service';
import { Tarefa } from '../models/tarefa.model';
import { Prioridade } from '../models/prioridade.model';

@Component({
  selector: 'app-tarefa-dialog',
  templateUrl: './tarefa-dialog.component.html',
  styleUrls: ['./tarefa-dialog.component.css']
})
export class TarefaDialogComponent implements OnInit {

  dialogTitulo = 'Nova Tarefa';
  tarefa: Tarefa = {titulo: '', prioridade: null};
  prioridades: Prioridade[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<TarefaDialogComponent>, //fazer referencia ao dialog para fechar
    private tarefaService: TarefaService //referecia para salvar
  ) { }

  ngOnInit(): void {
    // atualiza o titulo da tarefa: NOVA OU ATUALIZAR
    if (this.data) {
      this.dialogTitulo = 'Atualizar Tarefa';
      this.tarefa = this.data.tarefa;
    }
    // obtem a lista de prioridades
    this.prioridades = this.tarefaService.getPrioridades()
  }

  onSave(){
    const operation: Promise<void> = 
      (!this.data) 
        ? this.tarefaService.create(this.tarefa)
        : this.tarefaService.update(this.tarefa);

    operation
      .then(() => {
        this.dialogRef.close(); //fechar o dialog
      });
  }
}
