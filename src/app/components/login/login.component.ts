import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from '../usuarios.model';
import { ServiciosService } from '../../servicios.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  seePass = 'password';
  msgErr = false;
  errComent: string;
  user: UsuariosModel = new UsuariosModel();

  constructor(private users: UsuariosModel, private servicios: ServiciosService, private router: Router) { }

  ngOnInit() {
  }

  verifyUser( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }
    this.servicios.loginInitial(form.value.email, form.value.password).subscribe(
      resp => {
        this.msgErr = false;
        this.router.navigateByUrl('home');
    }, (err) => {
      this.msgErr = true;
      this.errComent = 'Email or Password invalid';
    });
  }

}
