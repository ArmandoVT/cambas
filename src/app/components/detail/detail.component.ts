import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../servicios.service';
import { ActivatedRoute } from '@angular/router';
import { UsuariosModel, CommentsModel } from '../usuarios.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

  listaErr: boolean;
  datos: UsuariosModel[];
  datosComments: CommentsModel[];
  constructor(private servicio: ServiciosService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.servicio.datosOneUser( Number(id) )
      .subscribe(
        (resp: UsuariosModel[]) => {
          this.datos = resp;
          this.servicio.comments(resp[0].id).subscribe(
            (comments: CommentsModel[]) => {
              this.datosComments = comments;
            }
            , (err) => {
            this.listaErr = true;
          });
        }
        , (err) => {
        this.listaErr = true;
      });

  }

}
