import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarLembreteComponent } from './criar-lembrete.component';

describe('CriarLembreteComponent', () => {
  let component: CriarLembreteComponent;
  let fixture: ComponentFixture<CriarLembreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarLembreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarLembreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
