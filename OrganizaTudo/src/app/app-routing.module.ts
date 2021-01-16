import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
