import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaDialogComponent } from './tarefa-dialog.component';

describe('TarefaDialogComponent', () => {
  let component: TarefaDialogComponent;
  let fixture: ComponentFixture<TarefaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
