import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  base = 'https://webhooks.mongodb-realm.com/api/client/v2.0/app/organiza-tudo-luhho/service/API/incoming_webhook';

  // USUÁRIO
  CriarConta(apelido: string, email: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/criarConta',
        { apelido, email, senha }
      ).toPromise();
  }

  Login(apelido: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/Login',
        { apelido, senha }
      ).toPromise();
  }

  validacaoToken(): Promise<any> {
    return this.http.post
      (
        this.base + '/validacaoToken',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  ListarPerfil(): Promise<any> {
    return this.http.post
      (
        this.base + '/listarPerfil',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPerfil(email: string, apelido: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/atualizarPerfil',
        { dados: { email, apelido, senha } },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }


  // NOTAS
  CriarNota(nota: any): Promise<any> {
    return this.http.post
      (
        this.base + '/inserirNota',
        { nota },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarNota(id: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarNota',
        { id },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarNotas(titulo: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarNotas',
        { titulo },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  BuscarNotas(): Promise<any> {
    return this.http.post
      (
        this.base + '/buscarNotas',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      )
      .toPromise();
  }

  AtualizarNota(notaID: string, nota: any): Promise<any> {
    return this.http.post
      (
        this.base + '/editarNota',
        { notaNova: nota, notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPrivacidadeNota(notaID: string, privacidade: boolean): Promise<any> {
    return this.http.post
      (
        this.base + '/atualizarPrivacidadeNota',
        { privacidade, notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  DeletarNota(notaID: string): Promise<any> {
    return this.http.post
      (
        this.base + '/deletarNota',
        { notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }


  // LEMBRETE
  CriarLembrete(dados: any): Promise<any> {
    return this.http.post
      (
        this.base + '/inserirLembrete',
        { dados },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarLembrete(id: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarLembrete',
        { id },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarLembretes(titulo: string): Promise<any> {
    return this.http.post
      (
        this.base + '/pesquisarLembretes',
        { titulo },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  BuscarLembretes(): Promise<any> {
    return this.http.post
      (
        this.base + '/buscarLembretes',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarLembrete(lembreteID: string, dados: any): Promise<any> {
    return this.http.post
      (
        this.base + '/editarLembrete',
        { dados, lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPrivacidadeLembrete(lembreteID: string, privacidade: boolean): Promise<any> {
    return this.http.post
      (
        this.base + '/atualizarPrivacidadeLembrete',
        { privacidade, lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  DeletarLembrete(lembreteID: string): Promise<any> {
    return this.http.post
      (
        this.base + '/deletarLembrete',
        { lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

}