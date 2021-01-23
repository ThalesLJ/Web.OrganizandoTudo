import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService, private sessao: SessaoService) { }

  notas: any;

  ngOnInit(): void {
    this.sessao.validarToken();
  }

  Sair(): void{
    this.sessao.Sair();
  }

}
