import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotaComponent } from './paginas/nota/nota.component';
import { CriarNotaComponent } from './paginas/criar-nota/criar-nota.component';
import { HomeComponent } from './paginas/home/home.component';
import { LembretesComponent } from './paginas/lembretes/lembretes.component';
import { LoginComponent } from './paginas/login/login.component';
import { NotasComponent } from './paginas/notas/notas.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { RecuperarSenhaComponent } from './paginas/recuperar-senha/recuperar-senha.component';
import { CriarLembreteComponent } from './paginas/criar-lembrete/criar-lembrete.component';
import { EditarLembreteComponent } from './paginas/editar-lembrete/editar-lembrete.component';
import { CriarContaComponent } from './paginas/criar-conta/criar-conta.component';
import { LembreteComponent } from './paginas/lembrete/lembrete.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: AppComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'nota/:id', component: NotaComponent },
      { path: 'lembrete/:id', component: LembreteComponent },
      { path: 'recuperar-senha', component: RecuperarSenhaComponent },
      { path: 'criar-conta', component: CriarContaComponent },
      {
        path: 'home', component: HomeComponent,
        children: [
          { path: '', redirectTo: 'notas', pathMatch: 'full' },
          { path: 'notas', component: NotasComponent },
          { path: 'lembretes', component: LembretesComponent },
          { path: 'perfil', component: PerfilComponent },
          { path: 'criar-nota', component: CriarNotaComponent },
          { path: 'criar-lembrete', component: CriarLembreteComponent },
          { path: 'editar-lembrete/:id', component: EditarLembreteComponent },
        ]
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
