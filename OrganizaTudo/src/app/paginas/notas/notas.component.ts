import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

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

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }

}




import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nota',
  templateUrl: '../../componentes/nota.html',
  styleUrls: ['../../componentes/nota.css']
})
export class AppNotaComponent {

  constructor(
    public dialogRef: MatDialogRef<AppNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  salvar(): void {
    this.dialogRef.close();
  }

  excluir(): void {
    this.dialogRef.close();
  }

}
