import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lembrete',
  templateUrl: './lembrete.component.html',
  styleUrls: ['./lembrete.component.css']
})
export class LembreteComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private route: ActivatedRoute, private fBuilder: FormBuilder) { }

  lembreteLista1: any; titulo1 = '';
  lembreteLista2: any; titulo2 = '';
  lembreteLista3: any; titulo3 = '';
  lembreteLista4: any; titulo4 = '';
  lembreteLista5: any; titulo5 = '';
  lembretes = 1;

  titulo = '';
  nota = '';
  publico = false;
  mensagem = '';

  ngOnInit(): void {

    this.lembreteLista1 = this.fBuilder.group({
      item: [''],
      status: [false],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.lembrete1.removeAt(0);

    this.lembreteLista2 = this.fBuilder.group({
      item: [''],
      status: [false],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.lembrete2.removeAt(0);

    this.lembreteLista3 = this.fBuilder.group({
      item: [''],
      status: [false],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.lembrete3.removeAt(0);

    this.lembreteLista4 = this.fBuilder.group({
      item: [''],
      status: [false],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.lembrete4.removeAt(0);

    this.lembreteLista5 = this.fBuilder.group({
      item: [''],
      status: [false],
      itemRows: this.fBuilder.array([this.initItemRows()])
    });
    this.lembrete5.removeAt(0);

    this.route.params.subscribe(params => {
      this.api.PesquisarLembrete(params['id']).then((retorno: any) => {
        if (retorno != null && retorno !== '404') {
          this.titulo = retorno.titulo;
          this.publico = true;

          this.lembretes = retorno.lembrete.length;

          if (this.lembretes >= 1) {
            this.titulo1 = retorno.lembrete[0].titulo;
            for (let i = 0; i < retorno.lembrete[0].itens.length;) {
              this.addItemWithText(1, retorno.lembrete[0].itens[i].item, retorno.lembrete[0].itens[i].status);
              i++;
            }
          }
          if (this.lembretes >= 2) {
            this.titulo2 = retorno.lembrete[1].titulo;
            for (let i = 0; i < retorno.lembrete[1].itens.length;) {
              this.addItemWithText(2, retorno.lembrete[1].itens[i].item, retorno.lembrete[1].itens[i].status);
              i++;
            }
          }
          if (this.lembretes >= 3) {
            this.titulo3 = retorno.lembrete[2].titulo;
            for (let i = 0; i < retorno.lembrete[2].itens.length;) {
              this.addItemWithText(3, retorno.lembrete[2].itens[i].item, retorno.lembrete[2].itens[i].status);
              i++;
            }
          }
          if (this.lembretes >= 4) {
            this.titulo4 = retorno.lembrete[3].titulo;
            for (let i = 0; i < retorno.lembrete[3].itens.length;) {
              this.addItemWithText(4, retorno.lembrete[3].itens[i].item, retorno.lembrete[3].itens[i].status);
              i++;
            }
          }
          if (this.lembretes >= 5) {
            this.titulo5 = retorno.lembrete[4].titulo;
            for (let i = 0; i < retorno.lembrete[4].itens.length;) {
              this.addItemWithText(5, retorno.lembrete[4].itens[i].item, retorno.lembrete[4].itens[i].status);
              i++;
            }
          }

        } else {
          this.mensagem = 'Erro 403 - Esse lembrete não é público!';
          this.publico = false;
        }
      }).catch((retorno: any) => { this.publico = false; });
    });
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

  initItemRows(): any {
    return this.fBuilder.group({
      item: [''],
      status: [false],
    });
  }

  initItemWithtext(item: string, status: boolean): any {
    return this.fBuilder.group({
      item: [item],
      status: [status],
    });
  }

  addItemWithText(lembrete: any, item: string, status: boolean): void {
    if (lembrete === 1) { this.lembrete1.push(this.initItemWithtext(item, status)); }
    if (lembrete === 2) { this.lembrete2.push(this.initItemWithtext(item, status)); }
    if (lembrete === 3) { this.lembrete3.push(this.initItemWithtext(item, status)); }
    if (lembrete === 4) { this.lembrete4.push(this.initItemWithtext(item, status)); }
    if (lembrete === 5) { this.lembrete5.push(this.initItemWithtext(item, status)); }
  }

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
    }
    else if (this.lembretes === 4) {
      this.lembretes++;
    }
  }

  subLista(): void {
    if (this.lembretes > 2) {
      this.lembretes--;
    }
    else if (this.lembretes === 2) {
      this.lembretes--;
    }
  }

}
