import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private servicios: ServiciosService,
               private router: Router) {

  }
  canActivate(): boolean {
    if ( this.servicios.verificadorSesion() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
