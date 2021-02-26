import { Component, OnInit } from '@angular/core';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sessao: SessaoService) { }

  notas: any;
  usuario = 'Sair da Conta';

  ngOnInit(): void {
    this.sessao.validarToken();
    //this.usuario = this.sessao.getApelido() != null ? '' : this.sessao.getApelido() + ' - Sair';
  }

  Sair(): void {
    this.sessao.Sair();
  }

}
