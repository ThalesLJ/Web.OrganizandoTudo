import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criar-lembrete',
  templateUrl: './criar-lembrete.component.html',
  styleUrls: ['./criar-lembrete.component.css']
})
export class CriarLembreteComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private router: Router, private fBuilder: FormBuilder) { }

  _lembrete1: any; titulo1 = '';
  _lembrete2: any; titulo2 = '';
  _lembrete3: any; titulo3 = '';
  _lembrete4: any; titulo4 = '';
  _lembrete5: any; titulo5 = '';

  lembretes = 1;
  addImage = 'add-icon-azul.png';
  subImage = 'sub-icon-desativado.png';

  titulo = '';

  ngOnInit(): void {
    this.sessao.validarToken();

    this._lembrete1 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this._lembrete2 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this._lembrete3 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this._lembrete4 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this._lembrete5 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

  }

  initItemRows() {
    return this.fBuilder.group({
      item: ['']
    });
  }

  Salvar(): void {
    const lembrete: any[] = [];

    if (this.lembretes >= 1) { lembrete.push({ titulo: this.titulo1, itens: this._lembrete1.value.itemRows }) }
    if (this.lembretes >= 2) { lembrete.push({ titulo: this.titulo2, itens: this._lembrete2.value.itemRows }) }
    if (this.lembretes >= 3) { lembrete.push({ titulo: this.titulo3, itens: this._lembrete3.value.itemRows }) }
    if (this.lembretes >= 4) { lembrete.push({ titulo: this.titulo4, itens: this._lembrete4.value.itemRows }) }
    if (this.lembretes === 5) { lembrete.push({ titulo: this.titulo5, itens: this._lembrete5.value.itemRows }) }

    this.api.CriarLembrete(
      { titulo: this.titulo, lembrete })
      .then((retorno) => { this.router.navigate(['/home/lembretes']); })
      .catch((retorno) => { });
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any): void {
    if (e.ctrlKey && e.keyCode === 13) {
      this.Salvar();
    } else if (e.shiftKey && e.ctrlKey && e.keyCode === 83) {
      this.Salvar();
    }
  }

  add(): void {
    if (this.lembretes < 4) {
      this.lembretes++;
      this.addImage = 'add-icon-azul.png';
      this.subImage = 'sub-icon-vermelho.png';
    }
    else if (this.lembretes === 4) {
      this.lembretes++;
      this.addImage = 'add-icon-desativado.png';
      this.subImage = 'sub-icon-vermelho.png';
    }
  }

  sub(): void {
    if (this.lembretes > 2) {
      this.lembretes--;
      this.subImage = 'sub-icon-vermelho.png';
      this.addImage = 'add-icon-azul.png';
    }
    else if (this.lembretes === 2) {
      this.lembretes--;
      this.subImage = 'sub-icon-desativado.png';
      this.addImage = 'add-icon-azul.png';
    }
  }


  // Campos dinamicos - TAREFAS ----------------------------------------------
  // Lembrete1 - Dinamic Field
  get lembrete1(): any {
    return this._lembrete1.get('itemRows') as FormArray;
  }

  // Lembrete2 - Dinamic Field
  get lembrete2(): any {
    return this._lembrete2.get('itemRows') as FormArray;
  }

  // Lembrete3 - Dinamic Field
  get lembrete3(): any {
    return this._lembrete3.get('itemRows') as FormArray;
  }

  // Lembrete4 - Dinamic Field
  get lembrete4(): any {
    return this._lembrete4.get('itemRows') as FormArray;
  }

  // Lembrete5 - Dinamic Field
  get lembrete5(): any {
    return this._lembrete5.get('itemRows') as FormArray;
  }

  addLembrete(lembrete: any): void {
    if (lembrete === 1) { this.lembrete1.push(this.initItemRows()); }
    if (lembrete === 2) { this.lembrete2.push(this.initItemRows()); }
    if (lembrete === 3) { this.lembrete3.push(this.initItemRows()); }
    if (lembrete === 4) { this.lembrete4.push(this.initItemRows()); }
    if (lembrete === 5) { this.lembrete5.push(this.initItemRows()); }
  }

  subLembrete(lembrete: any): void {
    if (lembrete === 1) { this.lembrete1.removeAt(this.lembrete1.length - 1); }
    if (lembrete === 2) { this.lembrete2.removeAt(this.lembrete2.length - 1); }
    if (lembrete === 3) { this.lembrete3.removeAt(this.lembrete3.length - 1); }
    if (lembrete === 4) { this.lembrete4.removeAt(this.lembrete4.length - 1); }
    if (lembrete === 5) { this.lembrete5.removeAt(this.lembrete5.length - 1); }
  }

}
