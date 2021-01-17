import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor() { }

  Login(id: string): void {
    localStorage.setItem('USUARIO', id);
  }

}
