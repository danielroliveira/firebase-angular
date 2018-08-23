import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcaoDialogComponent } from './acao-dialog.component';

describe('AcaoDialogComponent', () => {
  let component: AcaoDialogComponent;
  let fixture: ComponentFixture<AcaoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcaoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
