import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-inferior',
  templateUrl: './barra-inferior.component.html',
  styleUrls: ['./barra-inferior.component.scss']
})
export class BarraInferiorComponent {

  @Input() barraType: boolean // true: Concluidas; false: A fazer

  // Conluir todas as tarefas marcadas
  @Output() doConcluirSelect = new EventEmitter();

  // Conluir todas as tarefas marcadas
  @Output() doAFazerSelect = new EventEmitter();

  // Conluir todas as tarefas marcadas
  @Output() doExcluirSelect = new EventEmitter();

  executeAction(action: string): void {
    this[action].emit();
  }

}
