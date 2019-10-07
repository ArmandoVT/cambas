import { Component, OnInit } from '@angular/core';
import { UsuariosModel } from '../usuarios.model';
import { ServiciosService } from '../../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private users: UsuariosModel, private servicios: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.users.email = 'Webster.Mayer@Kessler.biz';
    this.users.firstname = 'Glen';
    this.users.lastname = 'Dickinson';
    this.users.password = '6Hallie64';
    this.users.id = 1;
    this.servicios.login(this.users).subscribe(
      resp => {
        this.router.navigateByUrl('home');
    }, (err) => {
      console.log(`usuario no registrado `);
    });
  }

}
