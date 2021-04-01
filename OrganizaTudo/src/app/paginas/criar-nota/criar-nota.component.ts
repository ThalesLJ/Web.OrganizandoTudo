import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})

export class CriarNotaComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private router: Router) { }

  titulo = '';
  nota = '';

  ngOnInit(): void {
    this.sessao.validarToken();
  }

  Salvar(): void {
    if(this.titulo !== '' && this.nota !== ''){
      const nota = { titulo: this.titulo, nota: this.nota };
      this.api.CriarNota(nota).then((retorno) => { this.router.navigate(['/home/notas']); }).catch((retorno) => { });
    } else {
      alert('Preencha todos os campos para salvar a Nota!');
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: any): void {
    if (e.ctrlKey && e.keyCode === 13) {
      this.Salvar();
    } else if (e.shiftKey && e.ctrlKey && e.keyCode === 83) {
      this.Salvar();
    }
  }

}
