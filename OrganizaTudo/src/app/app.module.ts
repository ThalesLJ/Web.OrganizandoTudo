import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './paginas/home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CriarNotaComponent } from './paginas/criar-nota/criar-nota.component';
import { NotasComponent } from './paginas/notas/notas.component';
import { LembretesComponent } from './paginas/lembretes/lembretes.component';
import { TarefasComponent } from './paginas/tarefas/tarefas.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { AppNotaComponent } from './paginas/notas/notas.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CriarNotaComponent,
    NotasComponent,
    LembretesComponent,
    TarefasComponent,
    PerfilComponent,
    AppNotaComponent
  ],
  entryComponents: [
    MatDialogModule,
    MatButtonModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
