import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Tarefa } from '../models/tarefa.model';
import { Prioridade } from '../models/prioridade.model';

@Component({
  selector: 'app-tarefa-item',
  templateUrl: './tarefa-item.component.html',
  styleUrls: ['./tarefa-item.component.scss']
})
export class TarefaItemComponent implements OnInit {

  descricao: string = '';
  prioridadeColor: string = 'black';

  ngOnInit(): void {
    this.descricao = this.prioridades.find(x => x.value == this.tarefa.prioridade).descricao
    switch (this.tarefa.prioridade) {
      case 1:
        this.prioridadeColor = 'red';
        break;
      case 2:
        this.prioridadeColor = 'blue';
        break;
      case 3:
        this.prioridadeColor = 'green';
        break;
      default:
        this.prioridadeColor = 'black';
        break;
    }
  }

  // recebe a tarefa do componet pai
  @Input() tarefa: Tarefa;
  @Input() prioridades: Prioridade[];

  // ao selecionar uma terefa retorna a tarefa atual
  @Output() selectTarefa = new EventEmitter<Tarefa>();

  // ao alterar o valor de tarefa feita boolean
  @Output() performTarefa = new EventEmitter<Tarefa>();

  // ao marcar a tarefa com checkbox
  @Output() checkTarefa = new EventEmitter<Tarefa>();

  executeAction(action: string): void {
    // if (action === 'select') {
    //   this.selectTarefa.emit(this.tarefa)
    // }
    this[action].emit(this.tarefa);
  }

  //descricao = this.prioridades.find(x => x.value == this.tarefa.prioridade)

}