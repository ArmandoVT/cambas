import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuariosModel } from '../usuarios.model';
import { ServiciosService } from '../../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  seePass = 'password';
  seePassConf = 'password';
  msgErr = false;
  errComent: string;
  configUrl = 'http://18.221.11.198:3000/users';

  user: UsuariosModel = new UsuariosModel();
  passConf: string;

  constructor( private users: UsuariosModel, private servicios: ServiciosService, private router: Router, private http: HttpClient ) { }

  ngOnInit() {
    /*const url = `http://18.221.11.198:3000/users/23`;
    this.http.delete(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).subscribe((reponse) => {
      console.log('si');
     }, (error) => {
      console.log('no');
     });*/
  }

  register( form: NgForm ) {
    if ( form.invalid ) { return; }
    this.servicios.verificador(form).subscribe(
      resp => {
        this.msgErr = false;
        if ( Object.keys(resp).length === 0 ) {
          this.msgErr = false;
          this.servicios.registerUsers( form ).subscribe(
            register => {
              this.router.navigateByUrl('home');
          }, (err) => {
            this.msgErr = true;
            this.errComent = 'Not registered, try again';
          });
        } else {
          this.msgErr = true;
          this.errComent = 'E-mail registered';
        }
    }, (err) => {
      this.msgErr = true;
      this.errComent = 'Process not completed, try again';
    });
  }
}
