import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessaoService } from '.././../servicos/sessao.service';
import { ApiService } from 'src/app/servicos/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router, private api: ApiService,
    private sessao: SessaoService
  ) { }

  apelido = '';
  senha = '';
  mensagem = '';

  ngOnInit(): void {
  }

  Login(event: any): void {

    // Evita o "submit" do form
    event.preventDefault();

    // Login
    this.api.Login(this.apelido, this.senha).then((resultado: any) => {
      if (this.apelido === '' || this.senha === '') {
        this.mensagem = ('Preencha todos os campos!!!');
      } else if (resultado !== '404') {
        this.mensagem = '';
        this.sessao.Login(resultado.$oid);
        this.router.navigate(['/home']);
      } else {
        this.mensagem = ('Usuário "' + this.apelido + '" não encontrado');
      }
    })

  }

}
