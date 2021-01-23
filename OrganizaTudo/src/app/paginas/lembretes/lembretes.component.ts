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

  ngOnInit(): void {
    this.sessao.validarToken();
  }

}
