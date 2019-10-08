import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../servicios.service';
import { Router } from '@angular/router';
import { UsuariosModel } from '../usuarios.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  filterPost = '';
  listaErr: boolean;
  datos: UsuariosModel;
  pagedItems: UsuariosModel[];
  allItems: UsuariosModel[];
  pager: any = {};
  sesion: string;


  constructor( private servicio: ServiciosService, private router: Router) { }

  ngOnInit() {
    this.servicio.lista().subscribe(
      (resp: UsuariosModel[]) => {
        this.allItems = resp;
        this.setPage(1);
      }
      , (err) => {
      this.listaErr = true;
    });
    this.sesion = this.servicio.leerSesion('name');
  }

  salir() {
    this.servicio.logout();
    this.router.navigateByUrl('/login');
  }

  setPage(page: number) {
      if (page < 1 || page > this.pager.totalPages) {
          return;
      }
      this.pager = this.servicio.getPager(this.allItems.length, page);
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
