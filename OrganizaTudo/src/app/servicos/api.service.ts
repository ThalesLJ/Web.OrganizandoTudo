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

  BuscarNotas(): Promise<any> {
    return this.http.post
      (
        this.base + '/buscarNotas',
        {
          token: localStorage.getItem('TOKEN')
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

}
