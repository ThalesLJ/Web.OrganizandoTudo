import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-criar-lembrete',
  templateUrl: './criar-lembrete.component.html',
  styleUrls: ['./criar-lembrete.component.css']
})
export class CriarLembreteComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private router: Router, private fBuilder: FormBuilder) { }

  lembreteLista1: any; titulo1 = '';
  lembreteLista2: any; titulo2 = '';
  lembreteLista3: any; titulo3 = '';
  lembreteLista4: any; titulo4 = '';
  lembreteLista5: any; titulo5 = '';

  lembretes = 1;
  addImage = 'add-icon-azul.png';
  subImage = 'sub-icon-desativado.png';

  titulo = '';

  ngOnInit(): void {
    this.sessao.validarToken();

    this.lembreteLista1 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.lembreteLista2 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.lembreteLista3 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.lembreteLista4 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

    this.lembreteLista5 = this.fBuilder.group({
      item: [''],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });

  }

  initItemRows(): any {
    return this.fBuilder.group({
      item: ['']
    });
  }

  Salvar(): void {
    if (this.titulo !== '') {
      const lembrete: any[] = [];

      if (this.lembretes >= 1) { lembrete.push({ titulo: this.titulo1, itens: this.lembreteLista1.value.itemRows }); }
      if (this.lembretes >= 2) { lembrete.push({ titulo: this.titulo2, itens: this.lembreteLista2.value.itemRows }); }
      if (this.lembretes >= 3) { lembrete.push({ titulo: this.titulo3, itens: this.lembreteLista3.value.itemRows }); }
      if (this.lembretes >= 4) { lembrete.push({ titulo: this.titulo4, itens: this.lembreteLista4.value.itemRows }); }
      if (this.lembretes === 5) { lembrete.push({ titulo: this.titulo5, itens: this.lembreteLista5.value.itemRows }); }

      this.api.CriarLembrete(
        { titulo: this.titulo, lembrete })
        .then((retorno) => { this.router.navigate(['/home/lembretes']); })
        .catch((retorno) => { });

    } else {
      alert('Preencha o título para salvar o Lembrete!');
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any): void {
    if (e.ctrlKey && e.keyCode === 13) {
      this.Salvar();
    } else if (e.shiftKey && e.ctrlKey && e.keyCode === 83) {
      this.Salvar();
    }
  }


  // LEMBRETES ----------------------------------------------
  // Lembrete1
  get lembrete1(): any {
    return this.lembreteLista1.get('itemRows') as FormArray;
  }
  // Lembrete2
  get lembrete2(): any {
    return this.lembreteLista2.get('itemRows') as FormArray;
  }
  // Lembrete3
  get lembrete3(): any {
    return this.lembreteLista3.get('itemRows') as FormArray;
  }
  // Lembrete4
  get lembrete4(): any {
    return this.lembreteLista4.get('itemRows') as FormArray;
  }
  // Lembrete5
  get lembrete5(): any {
    return this.lembreteLista5.get('itemRows') as FormArray;
  }

  // CONTROLES ----------------------------------------------
  // Controle de Itens
  addItem(lembrete: any): void {
    if (lembrete === 1) { this.lembrete1.push(this.initItemRows()); }
    if (lembrete === 2) { this.lembrete2.push(this.initItemRows()); }
    if (lembrete === 3) { this.lembrete3.push(this.initItemRows()); }
    if (lembrete === 4) { this.lembrete4.push(this.initItemRows()); }
    if (lembrete === 5) { this.lembrete5.push(this.initItemRows()); }
  }

  subItem(lembrete: any, posicao: any): void {
    if (lembrete === 1 && this.lembrete1.length !== 1) { this.lembrete1.removeAt(posicao); }
    if (lembrete === 2 && this.lembrete2.length !== 1) { this.lembrete2.removeAt(posicao); }
    if (lembrete === 3 && this.lembrete3.length !== 1) { this.lembrete3.removeAt(posicao); }
    if (lembrete === 4 && this.lembrete4.length !== 1) { this.lembrete4.removeAt(posicao); }
    if (lembrete === 5 && this.lembrete5.length !== 1) { this.lembrete5.removeAt(posicao); }
  }

  // Controle de Listas
  addLista(): void {
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

  subLista(): void {
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

}
