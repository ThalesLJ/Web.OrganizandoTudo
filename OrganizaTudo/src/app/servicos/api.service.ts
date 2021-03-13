import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  base = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/organiza-tudo-luhho/service/API/incoming_webhook';

  Login(apelido: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/Login',
        {
          apelido, senha
        }
      ).toPromise();
  }

  public validacaoToken(): Promise<any> {
    return this.http.post
      (
        this.base + '/validacaoToken',
        {
          token: localStorage.getItem('TOKEN')
        }
      ).toPromise();
  }

  BuscarNotas(): Promise<any> {
    return this.http.post
      (
        this.base + '/buscarNotas',
        {
          token: localStorage.getItem('TOKEN')
        }
      ).toPromise();
  }

  PesquisarNotas(titulo: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarNotas',
        {
          token: localStorage.getItem('TOKEN'), titulo
        }
      ).toPromise();
  }

  PesquisarNota(id: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarNota',
        {
          token: localStorage.getItem('TOKEN'), id
        }
      ).toPromise();
  }

  CriarNota(nota: any): Promise<any> {
    return this.http.post
      (
        this.base + '/inserirNota',
        {
          token: localStorage.getItem('TOKEN'),
          nota
        }
      ).toPromise();
  }

  AtualizarNota(notaID: string, nota: any): Promise<any> {
    return this.http.post
      (
        this.base + '/editarNota',
        {
          token: localStorage.getItem('TOKEN'),
          notaNova: nota,
          notaID
        }
      ).toPromise();
  }

  DeletarNota(notaID: string): Promise<any> {
    return this.http.post
      (
        this.base + '/deletarNota',
        {
          token: localStorage.getItem('TOKEN'),
          notaID
        }
      ).toPromise();
  }

  AtualizarPrivacidadeNota(notaID: string, privacidade: boolean): Promise<any> {
    return this.http.post
      (
        this.base + '/atualizarPrivacidadeNota',
        {
          token: localStorage.getItem('TOKEN'),
          privacidade,
          notaID
        }
      ).toPromise();
  }

  AtualizarPerfil(email: string, apelido: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/atualizarPerfil',
        {
          token: localStorage.getItem('TOKEN'),
          dados: { email, apelido, senha }
        }
      ).toPromise();
  }

  ListarPerfil(): Promise<any> {
    return this.http.post
      (
        this.base + '/listarPerfil',
        {
          token: localStorage.getItem('TOKEN')
        }
      ).toPromise();
  }

  CriarLembrete(dados: any): Promise<any> {
    return this.http.post
      (
        this.base + '/inserirLembrete',
        {
          token: localStorage.getItem('TOKEN'),
          dados
        }
      ).toPromise();
  }

  BuscarLembretes(): Promise<any> {
    return this.http.post
      (
        this.base + '/buscarLembretes',
        {
          token: localStorage.getItem('TOKEN')
        }
      ).toPromise();
  }

  PesquisarLembretes(titulo: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarLembretes',
        {
          token: localStorage.getItem('TOKEN'), titulo
        }
      ).toPromise();
  }

  DeletarLembrete(lembreteID: string): Promise<any> {
    return this.http.post
      (
        this.base + '/deletarLembrete',
        {
          token: localStorage.getItem('TOKEN'),
          lembreteID
        }
      ).toPromise();
  }

}
