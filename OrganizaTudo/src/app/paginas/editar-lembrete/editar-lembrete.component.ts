import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-lembrete',
  templateUrl: './editar-lembrete.component.html',
  styleUrls: ['./editar-lembrete.component.css']
})
export class EditarLembreteComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private router: Router, private fBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  lembreteLista1: any; titulo1 = '';
  lembreteLista2: any; titulo2 = '';
  lembreteLista3: any; titulo3 = '';
  lembreteLista4: any; titulo4 = '';
  lembreteLista5: any; titulo5 = '';

  lembretes = 1;
  addImage = 'add-icon-azul.png';
  subImage = 'sub-icon-desativado.png';

  titulo = '';
  IDLembrete = '';

  ngOnInit(): void {
    this.sessao.validarToken();
    this.CarregarLembrete();

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

  Salvar(): void {
    if (this.titulo !== '') {
      const lembrete: any[] = [];

      if (this.lembretes >= 1) { lembrete.push({ titulo: this.titulo1, itens: this.lembreteLista1.value.itemRows }); }
      if (this.lembretes >= 2) { lembrete.push({ titulo: this.titulo2, itens: this.lembreteLista2.value.itemRows }); }
      if (this.lembretes >= 3) { lembrete.push({ titulo: this.titulo3, itens: this.lembreteLista3.value.itemRows }); }
      if (this.lembretes >= 4) { lembrete.push({ titulo: this.titulo4, itens: this.lembreteLista4.value.itemRows }); }
      if (this.lembretes === 5) { lembrete.push({ titulo: this.titulo5, itens: this.lembreteLista5.value.itemRows }); }

      this.api.AtualizarLembrete(
        this.IDLembrete, { titulo: this.titulo, lembrete })
        .then((retorno) => { this.router.navigate(['/home/lembretes']); })
        .catch((retorno) => { });

    } else {
      alert('Preencha o título para salvar o Lembrete!');
    }
  }

  Excluir(): void {
    const cn = confirm
      ('Deseja excluir seu Lembrete?');
    if (cn) {
      this.api.DeletarLembrete(this.IDLembrete).then((retorno) => {
        this.router.navigate(['/home/lembretes']);
      }).catch(() => { });
    }
  }

  CarregarLembrete(): void {
    this.route.params.subscribe(params => {
      this.IDLembrete = params['id'];
      this.api.PesquisarLembrete(params['id']).then((retorno: any) => {
        if (retorno !== null && retorno !== '500' && retorno !== '404') {
          this.titulo = retorno.titulo;
          this.lembretes = retorno.lembrete.length;

          if (this.lembretes < 5) {
            this.addImage = 'add-icon-azul.png';
          } else {
            this.addImage = 'add-icon-desativado.png';
          }

          if (this.lembretes > 1) {
            this.subImage = 'sub-icon-vermelho.png';
          } else {
            this.subImage = 'sub-icon-desativado.png';
          }

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
          alert(retorno);
        }
      }).catch((retorno: any) => { alert(retorno); });
    });
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

  addItemWithText(lembrete: any, item: string, status: boolean): void {
    if (lembrete === 1) { this.lembrete1.push(this.initItemWithtext(item, status)); }
    if (lembrete === 2) { this.lembrete2.push(this.initItemWithtext(item, status)); }
    if (lembrete === 3) { this.lembrete3.push(this.initItemWithtext(item, status)); }
    if (lembrete === 4) { this.lembrete4.push(this.initItemWithtext(item, status)); }
    if (lembrete === 5) { this.lembrete5.push(this.initItemWithtext(item, status)); }
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
