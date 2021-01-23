import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  constructor(private api: ApiService, private sessao: SessaoService) { }

  notas: any;

  ngOnInit(): void {

    this.sessao.validarToken();

    this.api.BuscarNotas().then((retorno: any) => {
      this.notas = retorno;
    });

  }

}
