import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  email = '';
  apelido = '';
  senha = '';
  mensagem = '';
  ok = false;

  constructor(private api: ApiService, private sessao: SessaoService) { }

  ngOnInit(): void {
    this.sessao.validarToken();
    this.ListarPerfil();
  }

  ListarPerfil(): void {
    this.api.ListarPerfil().then(retorno => {
      this.email = retorno.email;
      this.apelido = retorno.apelido;
      this.ok = true;
    });
  }

  SalvarAlteracoes(): void {

    if (this.email === '' || this.apelido === '') {
      this.mensagem = 'Preencha todos os campos para continuar!';
    } else if (this.senha === '') {
      this.mensagem = 'É necessário informar sua senha atual, para salvar as alterações!';
    } else {
      this.mensagem = '';
      this.api.AtualizarPerfil(this.email, this.apelido, this.senha).then((resultado: any) => {
        if (resultado === '200') {
          this.sessao.Sair();
        } else if (resultado === '201') {
          this.mensagem = 'O E-mail informado já está em uso, tente cadastrar outro valor.';
        } else if (resultado === '202') {
          this.mensagem = 'O Apelido informado já está em uso, tente cadastrar outro valor.';
        } else if (resultado === '404') {
          this.mensagem = 'A Senha Atual informada está incorreta!';
        } else {
          this.mensagem = 'Ocorreu um erro, por favor tente novamente.';
        }
      });
    }

  }

}
