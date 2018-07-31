import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaItemComponent } from './tarefa-item.component';

describe('TarefaItemComponent', () => {
  let component: TarefaItemComponent;
  let fixture: ComponentFixture<TarefaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarefaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
