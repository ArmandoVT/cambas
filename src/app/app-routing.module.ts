import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailComponent } from './components/detail/detail.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'detail/:id', component: DetailComponent, canActivate: [ AuthGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
