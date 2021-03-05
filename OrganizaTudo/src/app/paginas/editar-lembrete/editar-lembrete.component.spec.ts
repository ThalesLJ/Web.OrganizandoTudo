import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLembreteComponent } from './editar-lembrete.component';

describe('EditarLembreteComponent', () => {
  let component: EditarLembreteComponent;
  let fixture: ComponentFixture<EditarLembreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarLembreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLembreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
