import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  mensagem = '';

  constructor(private api: ApiService, private sessao: SessaoService) { }

  ngOnInit(): void {
    this.sessao.validarToken();
  }

}
