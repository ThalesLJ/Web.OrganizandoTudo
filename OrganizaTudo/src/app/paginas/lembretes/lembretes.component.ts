import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-lembretes',
  templateUrl: './lembretes.component.html',
  styleUrls: ['./lembretes.component.css']
})
export class LembretesComponent implements OnInit {

  constructor(private api: ApiService, private sessao: SessaoService) { }

  lembretes: any;
  txtPesquisa = '';

  ngOnInit(): void {
    this.sessao.validarToken();
    this.AtualizarListagemLembretes();
  }

  PesquisarLembretes(): void {
    if (this.txtPesquisa !== '') {
      this.api.PesquisarLembretes(this.txtPesquisa).then((retorno: any) => {
        this.lembretes = retorno.reverse();
      });
    } else { this.AtualizarListagemLembretes(); }
  }

  AtualizarListagemLembretes(): void {
    this.api.BuscarLembretes().then((retorno: any) => {
      this.lembretes = retorno.reverse();
      this.txtPesquisa = '';
    });
  }

  Excluir(lembrete: any): void {
    const cn = confirm
      ('Deseja excluir seu Lembrete mesmo?');
    if (cn) {
      this.api.DeletarLembrete(lembrete._id.$oid).then((retorno) => {
        this.AtualizarListagemLembretes();
      }).catch(() => { });
    }
  }

}
