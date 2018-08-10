import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /* canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.usuarioAutenticado()) {
        console.log(this.authService)
        return true;
      }

      this.router.navigate(['/login'])
      return false;

  } */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.getCurrentUser()
        .then(user => {
          //this.router.navigate(['/tarefas']);
          return resolve(true);
        }, err => {
          this.router.navigate(['/login'])
          return reject(err);
        })
    })
  }

}
