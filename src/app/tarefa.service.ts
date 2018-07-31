import { Injectable } from '@angular/core';

import { Observable } from '../../node_modules/rxjs';
import { AngularFirestore, 
         AngularFirestoreCollection, 
         CollectionReference } from '../../node_modules/angularfire2/firestore';

import { Tarefa } from './models/tarefa.model';
import { Prioridade } from './models/prioridade.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  tarefas: AngularFirestoreCollection<Tarefa>

  constructor(
    private db: AngularFirestore
  ) { 
    this.setTarefas();
  }

  private setTarefas(): void {
    this.tarefas = this.db.collection<Tarefa>('/tarefas',
    (ref: CollectionReference) => ref.orderBy('feito','asc').orderBy('titulo','asc'));
  }

  //CRIAR NOVA TAREFA
  create(tarefa: Tarefa): Promise<void> {
    const uid = this.db.createId(); // gerar o ID automaticamente
    
    return this.tarefas.doc<Tarefa>(uid) // caminho da tarefa: /tarefas/dfgasdfsf4564/ NOVATAREFA
      .set({
        uid,
        titulo: tarefa.titulo,
        prioridade: tarefa.prioridade,
        feito: false
      });
  }

  // ATUALIZAR TAREFA
  update(tarefa: Tarefa): Promise<void> {
    return this.tarefas.doc<Tarefa>(tarefa.uid).update(tarefa);
  }

  //DELETAR TAREFA
  delete(tarefa: Tarefa): Promise<void> {
    return this.tarefas.doc<Tarefa>(tarefa.uid).delete();
  }

  //GET TAREFA PELO UID
  get(uid: string): Observable<Tarefa> {
    return this.tarefas.doc<Tarefa>(uid).valueChanges();
  }

  getPrioridades(): Prioridade[] {
    return [
      {value: 1, descricao: 'Urgente!!!'},
      {value: 2, descricao: 'Faça Logo'},
      {value: 3, descricao: 'Pra Depois...'}
    ];

  }

}
