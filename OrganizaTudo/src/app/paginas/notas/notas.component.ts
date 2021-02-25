import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    public dialog: MatDialog, private router: Router) { }

  notas: any;
  txtPesquisa = '';

  ngOnInit(): void {

    this.sessao.validarToken();

    this.AtualizarListagemNotas();

  }

  AtualizarListagemNotas(): void {
    this.api.BuscarNotas().then((retorno: any) => {
      this.notas = retorno.reverse();
    });
  }

  openDialog(nota: any): void {

    const dialogRef = this.dialog.open(AppNotaComponent, {
      width: '110%',
      height: '70vh',
      data: { nota }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.AtualizarListagemNotas();
    });

  }

  Visualizar(nota: any): void {
    this.router.navigate(['/nota/' + nota._id.$oid]);
  }

  PesquisarNota(): void {
    if (this.txtPesquisa !== '') {
      this.api.PesquisarNotas(this.txtPesquisa).then((retorno: any) => {
        this.notas = retorno.reverse();
      });
    } else { this.AtualizarListagemNotas(); }
  }

  AtualizarPrivacidade(nota: any, publica: any): void {
    const id = nota._id.$oid;
    this.api.AtualizarPrivacidadeNota(id, publica.currentTarget.checked).then((retorno) => {
    }).catch(() => { });
  }

}

@Component({
  selector: 'app-nota',
  templateUrl: '../../componentes/modal-nota/nota.html',
  styleUrls: ['../../componentes/modal-nota/nota.css']
})
export class AppNotaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) { }

  TituloAnterior = '';
  NotaAnterior = '';
  naoSalvo = false;

  ngOnInit(): void {
    this.NotaAnterior = this.data.nota.nota;
    this.TituloAnterior = this.data.nota.titulo;
  }

  salvar(): void {

    const id = this.data.nota._id.$oid;
    const nota = {
      titulo: this.data.nota.titulo,
      nota: this.data.nota.nota
    };

    this.api.AtualizarNota(id, nota).then((retorno) => {
      this.TituloAnterior = this.data.nota.titulo;
      this.NotaAnterior = this.data.nota.nota;
      this.naoSalvo = false;
    }).catch(() => { });

  }

  excluir(): void {

    const id = this.data.nota._id.$oid;

    this.api.DeletarNota(id).then((retorno) => {
      this.dialogRef.close();
    }).catch(() => { });

  }

  verificarNota(): void {
    if (this.data.nota.nota !== this.NotaAnterior) {
      this.naoSalvo = true;
    } else {
      this.naoSalvo = false;
    }
  }

  verificarTitulo(): void {
    if (this.data.nota.titulo !== this.TituloAnterior) {
      this.naoSalvo = true;
    } else {
      this.naoSalvo = false;
    }
  }

}
