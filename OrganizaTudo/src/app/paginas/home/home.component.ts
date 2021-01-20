import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.BuscarNotas().then(x => {
      console.log(x);
    });
  }

}
