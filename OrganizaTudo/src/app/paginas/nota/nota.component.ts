import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private route: ActivatedRoute) { }

  titulo = '';
  nota = '';
  publica = false;
  mensagem = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.api.PesquisarNota(params['id']).then((retorno: any) => {
        if (retorno != null && retorno !== '404') {
          this.titulo = retorno.titulo;
          this.nota = retorno.nota;
          this.publica = true;
        } else {
          this.mensagem = 'Erro 403 - Essa nota não é pública!';
          this.publica = false;
        }
      }).catch((retorno: any) => { this.publica = false; });

    });
  }

}
