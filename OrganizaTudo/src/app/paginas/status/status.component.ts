import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicos/api.service';
import { SessaoService } from 'src/app/servicos/sessao.service';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor(
    private api: ApiService, private sessao: SessaoService,
    private route: ActivatedRoute, private fBuilder: FormBuilder) { }

  titulo = '';
  status = '';
  publico = false;
  mensagem = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.api.PesquisarLembrete(params['id']).then((retorno: any) => {
        if (retorno != null && retorno !== '404') {
          this.titulo = retorno.titulo;
          this.publico = true;

          console.log(retorno.lembrete);

          // Informa quantas listas já foram adicionadas
          let listasAdicionadas = 0;

          // Lê o Array de Lembretes, e transforma em um Status
          for (let i = 0; i < retorno.lembrete.length;) {

            for (let j = 0; j < retorno.lembrete[i].itens.length;) {

              // Verifica se a Lista possui no minimo 01 Item Feito
              let alcancouLimiteMinimo = false;
              for (let k = 0; k < retorno.lembrete[i].itens.length;) {
                if (retorno.lembrete[i].itens[k].status === true) {
                  alcancouLimiteMinimo = true;
                }
                k++;
              }
              if (alcancouLimiteMinimo) {
                // Separa as Listas, com uma quebra de linha adicional
                if (i > 0 && j === 0 && listasAdicionadas !== 0) {
                  this.status += '\n';
                }

                // Adiciona o título da lista
                if (j === 0) {
                  this.status += (retorno.lembrete[i].titulo).toUpperCase() + ':\n';
                  listasAdicionadas++;
                }

                // Adiciona os Itens Feitos
                if (retorno.lembrete[i].itens[j].status === true) {
                  this.status += '- ' + retorno.lembrete[i].itens[j].item + '\n';
                }
              }

              j++;
            }

            i++;
          }
        } else {
          this.mensagem = 'Erro 403 - Esse lembrete não é público!';
          this.publico = false;
        }
      }).catch((retorno: any) => { this.publico = false; });
    });
  }

}
