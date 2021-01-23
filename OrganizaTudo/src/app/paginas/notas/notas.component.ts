import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  constructor(private api: ApiService) { }

  notas: any;

  ngOnInit(): void {
    this.api.BuscarNotas().then((retorno: any) => {
      this.notas = retorno;
    });
  }

}
