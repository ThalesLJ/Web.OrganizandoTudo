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

}
