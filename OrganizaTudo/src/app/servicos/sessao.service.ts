import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private api: ApiService, private router: Router) { }

  apelido = '';

  Login(TOKEN: string, APELIDO: string): void {
    localStorage.setItem('TOKEN', TOKEN);
    this.apelido = APELIDO;
  }

  Sair(): void {
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/login']);
  }

  public validarToken(pagina?: string): void {
    this.api.validacaoToken().then(token => {
      if (token === false) {
        this.Sair();
      } else {
        if (pagina === 'login') {
          this.router.navigate(['/home']);
        }
      }
    }).catch(() => {
      this.Sair();
    });
  }

  public getToken(): string {
    const TOKEN = '' + localStorage.getItem('TOKEN');
    return TOKEN;
  }

}
