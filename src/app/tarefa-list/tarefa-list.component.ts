import { Tarefa } from './../models/tarefa.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from '../../../node_modules/rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

import { MatDialog, MatDialogConfig } from '../../../node_modules/@angular/material';
import { TarefaDialogComponent } from '../tarefa-dialog/tarefa-dialog.component';

import { TarefaService } from '../tarefa.service';
import { Prioridade } from '../models/prioridade.model';
import { AcaoDialogComponent } from '../acao-dialog/acao-dialog.component';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.scss']
})
export class TarefaListComponent implements OnInit, OnDestroy {

  tarefas$: Observable<Tarefa[]>;

  tarefasRealizar: Tarefa[];
  tarefasConcluidas: Tarefa[];

  selectedTarefa: Tarefa;
  loading = true;
  prioridades: Prioridade[];

  showBarraInf: boolean = false;
  barraInfType: boolean = true;

  private subscriptions = new Subscription()

  constructor(
    private tarefaService: TarefaService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.tarefas$ = this.tarefaService.tarefas.valueChanges();

    this.subscriptions.add(

      this.tarefas$.subscribe((dados: Tarefa[]) => {
        dados.forEach((t) => t.selecionada = false);
        this.tarefasRealizar = dados.filter((t) => t.feito === false);
        this.tarefasConcluidas = dados.filter((t) => t.feito === true);
        this.loading = false;
      }, () => console.log("exit"))

    )

    this.prioridades = this.tarefaService.getPrioridades()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe;
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
    // verifica se há tarefas selecionadas de outra categoria
    if (tarefa.selecionada === true) {
      if (tarefa.feito === false) {
        this.barraInfType = true;
        this.tarefasConcluidas.forEach((t) => t.selecionada = false);
      } else {
        this.barraInfType = false;
        this.tarefasRealizar.forEach((t) => t.selecionada = false)
      }
    }
    // revela a barra inferior de opçoes
    if ((this.tarefasRealizar.some((t) => t.selecionada == true)) || (this.tarefasConcluidas.some((t) => t.selecionada == true))) {
      this.showBarraInf = true;
    } else {
      this.showBarraInf = false;
    }
  }

  ConcluirSelect() {
    this.openDialog('Tem certeza?', 'Concluir todas tarefas selecionadas...', 'Concluir')
  }

  doConcluirSelected() {
    this.tarefasRealizar.forEach((t) => {
      if (t.selecionada) {
        this.onPerformTarefa(t);
      };
    })
  }

  AFazerSelect() {
    this.openDialog('Tem certeza?', 'Marcar as tarefas selecionadas como tarefas a fazer.', 'AFazer')
  }

  doAFazerSelected() {
    this.tarefasConcluidas.forEach((t) => {
      if (t.selecionada) {
        this.onPerformTarefa(t);
      };
    })
  }

  ExcluirSelect() {
    this.openDialog('Tem certeza?', 'Excluir todas tarefas selecionadas...', 'Excluir')
  }

  doExcluirSelected() {
    if (!this.barraInfType) {
      this.tarefasConcluidas.forEach((t) => {
        if (t.selecionada) {
          this.onDelete(t);
        };
      })
    } else {
      this.tarefasRealizar.forEach((t) => {
        if (t.selecionada) {
          this.onDelete(t);
        };
      })
    }
  }

  openDialog(titulo: string, texto: string, acao: string): void {

    const dialogRef = this.dialog.open(AcaoDialogComponent, {
      width: '250px',
      data: { titulo, texto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (acao) {
          case 'Concluir':
            this.doConcluirSelected()
            break;
          case 'AFazer':
            this.doAFazerSelected()
            break;
          case 'Excluir':
            this.doExcluirSelected()
            break;
          case 'Sair':
            this.doLogOut()
            break;
          default:
            break;
        };
        this.showBarraInf = false;
      }
    });
  }

  doLogOut() {
    //this.subscriptions.unsubscribe;
    this.router.navigate(['/login']);
    this.authService.doLogout();
  }

  fazerLogOut() {
    this.openDialog('Tem certeza?', 'Deseja sair do sistema de Tarefas...', 'Sair')
  }

}
