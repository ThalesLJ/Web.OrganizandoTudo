import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})
export class CriarNotaComponent implements OnInit {

  constructor(private api: ApiService, private sessao: SessaoService) { }

  ngOnInit(): void {
    this.sessao.validarToken();
  }

}
