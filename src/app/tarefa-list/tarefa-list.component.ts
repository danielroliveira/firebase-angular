import { Tarefa } from './../models/tarefa.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { take } from '../../../node_modules/rxjs/operators'

import { MatDialog, MatDialogConfig } from '../../../node_modules/@angular/material';
import { TarefaDialogComponent } from '../tarefa-dialog/tarefa-dialog.component';

import { TarefaService } from '../tarefa.service';
import { Prioridade } from '../models/prioridade.model';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.scss']
})
export class TarefaListComponent implements OnInit {

  tarefasRealizar$: Observable<Tarefa[]>;
  tarefasConcluidas$: Observable<Tarefa[]>;
  selectedTarefa: Tarefa;
  loading = true;
  prioridades: Prioridade[];

  itensSelecionados: Tarefa[] = [];

  constructor(
    private tarefaService: TarefaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  
    this.tarefasRealizar$ = this.tarefaService.tarefasRealizar.valueChanges();
    this.tarefasConcluidas$ = this.tarefaService.tarefasConcluidas.valueChanges()
    
    //desliga o spinner
    this.tarefasConcluidas$
      .pipe(take(1)) // apenas o take 1
      .subscribe(() => this.loading = false); //não há  necessidade de unsubscribe

    this.prioridades = this.tarefaService.getPrioridades()
  }

  onPerformTarefa(tarefa: Tarefa): void {
    tarefa.feito = !tarefa.feito
    this.tarefaService.update(tarefa);
  }

  showDialog(tarefa?: Tarefa): void {
    const config: MatDialogConfig<any> = (tarefa) ? { data: { tarefa } } : null;
    this.dialog.open(TarefaDialogComponent, config);
  }

  onDelete(tarefa: Tarefa): void {
    this.tarefaService.delete(tarefa);
  }

  alteraPrioridade(newPrioridade: number, tarefa: Tarefa): void {
    if (tarefa.prioridade != newPrioridade) {
      tarefa.prioridade = newPrioridade;
      this.tarefaService.update(tarefa);
    }

  }

  onCheckTarefa(tarefa: Tarefa) {
    // procura se a tarefa já esta marcada
    let item	=	this.itensSelecionados.find(
      (t) => t.uid === tarefa.uid
    );
    // se não estiver marcada insere na lista
    // se já estiver retira da lista
    if (item) {
      this.itensSelecionados.splice(this.itensSelecionados.indexOf(item), 1)
    } else {
      this.itensSelecionados.push(tarefa)
    }
  }

}
