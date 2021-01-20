import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  notas: any;

  ngOnInit(): void {
    this.api.BuscarNotas().then((retorno: any) => {
      this.notas = retorno;
    });
  }

}
