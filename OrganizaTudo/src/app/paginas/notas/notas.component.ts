import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    public dialog: MatDialog) { }

  notas: any;

  ngOnInit(): void {

    this.sessao.validarToken();

    this.AtualizarListagemNotas();

  }

  AtualizarListagemNotas(): void {
    this.api.BuscarNotas().then((retorno: any) => {
      this.notas = retorno;
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

}

@Component({
  selector: 'app-nota',
  templateUrl: '../../componentes/modal-nota/nota.html',
  styleUrls: ['../../componentes/modal-nota/nota.css']
})
export class AppNotaComponent {

  constructor(
    public dialogRef: MatDialogRef<AppNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) { }

  salvar(): void {

    const id = this.data.nota._id.$oid;
    const nota = {
      titulo: this.data.nota.titulo,
      nota: this.data.nota.nota
    };

    this.api.AtualizarNota(id, nota).then((retorno) => {
      this.dialogRef.close();
    }).catch(() => { });

  }

  excluir(): void {

    const id = this.data.nota._id.$oid;

    this.api.DeletarNota(id).then((retorno) => {
      this.dialogRef.close();
    }).catch(() => { });

  }

}
