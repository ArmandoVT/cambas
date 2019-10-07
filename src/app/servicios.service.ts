import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosModel } from './components/usuarios.model';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = 'http://18.221.11.198:3000';
  sesion: string;
  datos = [];
  detail = [];

  constructor( private http: HttpClient ) {
    this.leerSesion('id');
  }

  loginInitial( mail: string, pass: string ) {
    return this.http.get(`${ this.url }/users?email=${mail}&password=${pass}`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        }).pipe(
      map( (resp: UsuariosModel) => {
        this.guardarSession( resp[0].id, resp[0].email, resp[0].firstname, resp[0].lastname );
        return resp;
      })
    );
  }

  logout() {
    localStorage.removeItem('email');
  }

  lista() {
    return this.http.get(`${ this.url }/posts`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        }).pipe(
      map( (resp: UsuariosModel) => this.arreglo(resp) )
    );
  }

  comments( id: number) {
    return this.http.get(`${ this.url }/comments?postId=${id}`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        }).pipe(
      map( (resp: UsuariosModel) => this.comentsDates(resp) )
    );
  }

  private comentsDates(resp: object) {
    const comments = [];
    Object.keys(resp).forEach(key => {
      const dato = resp[key];
      dato.body = resp[key].body;
      dato.date = resp[key].date;
      dato.postId = resp[key].postId;
      comments.push(dato);
    });
    return comments;
  }

  datosOneUser( id: number ) {
    this.datos = [];
    return this.http.get(`${ this.url }/posts?id=${id}`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        }).pipe(
      map( (resp: UsuariosModel) => this.arreglo(resp) )
    );
  }

  private arreglo(resp: object) {
    Object.keys(resp).forEach(key => {
      const dato = resp[key];
      dato.title = resp[key].title;
      dato.description = resp[key].description;
      dato.country = resp[key].country;
      dato.date = resp[key].date;
      dato.id = resp[key].id;
      dato.author = resp[key].author;
      this.listaUser(resp[key].author).subscribe(
        ( respUser: any ) => {
          dato.email = respUser.email;
          dato.firstname = respUser.firstname;
          dato.lastname = respUser.lastname;
      }, (err) => {
      });
      this.datos.push(dato);

    });
    return this.datos;
  }

  listaUser(id: number) {
    return this.http.get(`${ this.url }/users?id=${id}`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        }).pipe(
      map( (resp: UsuariosModel) => this.arregloUsers(resp) )
    );
  }

  verificador( usuario: NgForm ) {
    return this.http.get(`${ this.url }/users?email=${usuario.value.email}`, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
        });
  }

  registerUsers( form: NgForm ) {
    return this.http.post(`${ this.url }/users`, form.value, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(
      map( (resp: UsuariosModel) => {
        this.guardarSession( resp.id, resp.email, resp.firstname, resp.lastname );
        return resp;
      } )
    );
  }

  private arregloUsers(resp: object) {
      const dato: any = [];
      dato.id = resp[0].id;
      dato.firstname = resp[0].firstname;
      dato.lastname = resp[0].lastname;
      dato.email = resp[0].email;
      return dato;
  }

  private guardarSession( idUser: number, mailUser: string, fistNameUser: string, lastNameUser: string ) {
    localStorage.setItem('id', idUser.toString());
    localStorage.setItem('email', mailUser);
    localStorage.setItem('name', `${fistNameUser} ${lastNameUser}`);
  }

  leerSesion(busqueda: string) {
    if ( localStorage.getItem(busqueda) ){
      this.sesion = localStorage.getItem(busqueda);
    } else {
      this.sesion = localStorage.getItem('');
    }
    return this.sesion;
  }

  verificadorSesion(): boolean {
    if ( localStorage.getItem('email') ){
      return true;
    } else {
      return false;
    }
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage: number;
    if (totalPages <= 1) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 1) {
            startPage = 1;
            endPage = 1;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages;
            endPage = totalPages;
        } else {
            startPage = currentPage;
            endPage = currentPage;
        }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
    };
}
}
