import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  apelido = '';
  email = '';
  senha = '';
  mensagem = '';

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private router: Router) { }

  ngOnInit(): void {

  }

  CriarConta(event: any): void {

    // Evita o "submit" do form
    event.preventDefault();

    // Login
    this.api.CriarConta(this.apelido, this.email, this.senha).then((resultado: any) => {
      if (this.apelido === '' || this.email === '' || this.senha === '') {
        this.mensagem = ('Preencha todos os campos!!!');
      } else if (resultado === '400.1') {
        this.mensagem = 'Esse Apelido já está em uso!';
      } else if (resultado === '400.2') {
        this.mensagem = 'Esse Email já está em uso!';
      } else if (resultado === '500') {
        this.mensagem = 'Ocorreu um erro, por favor tente novamente!';
      } else {
        this.mensagem = '';
        this.router.navigate(['/login']);
      }
    });

  }

}
