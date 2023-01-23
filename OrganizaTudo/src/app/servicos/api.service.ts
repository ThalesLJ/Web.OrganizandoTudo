import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  base = 'https://data.mongodb-api.com/app/application-0-mqvuy/endpoint';

  // USUÁRIO
  CriarConta(apelido: string, email: string, senha: string): Promise<any> {
    return this.http.post
      (
        this.base + '/CriarConta',
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
        this.base + '/ValidarToken',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  ListarPerfil(): Promise<any> {
    return this.http.get
      (
        this.base + '/Perfil',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPerfil(email: string, apelido: string, senha: string): Promise<any> {
    return this.http.put
      (
        this.base + '/Perfil',
        { dados: { email, apelido, senha } },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }


  // NOTAS
  CriarNota(nota: any): Promise<any> {
    return this.http.post
      (
        this.base + '/Nota',
        { nota },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarNota(id: string): Promise<any> {
    return this.http.get
      (
        this.base + '/Nota',
        { id },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarNotas(titulo: string): Promise<any> {
    return this.http.get
      (
        this.base + '/Notas',
        { titulo },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  BuscarNotas(): Promise<any> {
    return this.http.get
      (
        this.base + '/Notas',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      )
      .toPromise();
  }

  AtualizarNota(notaID: string, nota: any): Promise<any> {
    return this.http.put
      (
        this.base + '/Nota',
        { notaNova: nota, notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPrivacidadeNota(notaID: string, privacidade: boolean): Promise<any> {
    return this.http.put
      (
        this.base + '/AtualizarPrivacidadeNota',
        { privacidade, notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  DeletarNota(notaID: string): Promise<any> {
    return this.http.delete
      (
        this.base + '/Nota',
        { notaID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }


  // LEMBRETE
  CriarLembrete(dados: any): Promise<any> {
    return this.http.post
      (
        this.base + '/Lembrete',
        { dados },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarLembrete(id: string): Promise<any> {
    return this.http.get
      (
        this.base + '/Lembrete',
        { id },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  PesquisarLembretes(titulo: string): Promise<any> {
    return this.http.get
      (
        this.base + '/Lembretes',
        { titulo },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  BuscarLembretes(): Promise<any> {
    return this.http.get
      (
        this.base + '/Lembretes',
        {},
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarLembrete(lembreteID: string, dados: any): Promise<any> {
    return this.http.put
      (
        this.base + '/Lembrete',
        { dados, lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  AtualizarPrivacidadeLembrete(lembreteID: string, privacidade: boolean): Promise<any> {
    return this.http.put
      (
        this.base + '/AtualizarPrivacidadeLembrete',
        { privacidade, lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

  DeletarLembrete(lembreteID: string): Promise<any> {
    return this.http.delete
      (
        this.base + '/Lembrete',
        { lembreteID },
        { headers: { Authorization: 'Bearer ' + localStorage.getItem('TOKEN') } }
      ).toPromise();
  }

}
