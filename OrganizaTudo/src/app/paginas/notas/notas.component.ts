import { Component, Inject, OnInit, HostListener } from '@angular/core';
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
      this.txtPesquisa = '';
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
      if (retorno === '200') {
        this.AtualizarListagemNotas()
      }
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
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {

  }

  TituloAnterior = '';
  NotaAnterior = '';
  naoSalvo = false;

  ngOnInit(): void {
    this.NotaAnterior = this.data.nota.nota;
    this.TituloAnterior = this.data.nota.titulo;
    this.dialogRef.backdropClick().subscribe(async () => await this.confirmarFechamento());
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any): void {
    if (e.ctrlKey && e.keyCode === 13) {
      this.salvar();
    } else if (e.shiftKey && e.ctrlKey && e.keyCode === 83) {
      this.salvar();
    }
    if (e.keyCode === 27) {
      this.confirmarFechamento();
    }
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
      const cn = confirm
        ('Deseja excluir sua Nota mesmo?');
      if (cn) {
        this.dialogRef.close();
      }
    }).catch(() => { });

  }

  salvar_sair(): void {
    const id = this.data.nota._id.$oid;
    const nota = {
      titulo: this.data.nota.titulo,
      nota: this.data.nota.nota
    };

    this.api.AtualizarNota(id, nota).then((retorno) => {
      this.TituloAnterior = this.data.nota.titulo;
      this.NotaAnterior = this.data.nota.nota;
      this.naoSalvo = false;
      this.fechar();
    }).catch(() => { });
  }

  fechar(): void {
    if (this.naoSalvo) {
      const cn = confirm
        ('Tem certeza que deseja voltar à tela anterior? \nSe fechar fechar a nota, perderá todas as modificações realizadas.');
      if (cn) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

  confirmarFechamento(): void {
    if (this.naoSalvo) {
      const cn = confirm
        ('Sua nota será fechada, clique em "OK" se quiser salvar suas modificações:');
      if (cn) {
        this.salvar();
      }
    }
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
