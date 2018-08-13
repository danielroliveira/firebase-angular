import { Router } from '@angular/router';
import { 
  Component, 
  ElementRef,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

import { MatDialog, MatDialogConfig  } from '@angular/material';

import { AuthService } from '../login/auth.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { SairDialogComponent } from '../sair-dialog/sair-dialog.component';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent {
   
  navIsFixed: boolean = true;
  @Output() navHeight = new EventEmitter<number>();
  @ViewChild('barraSuperior', {read: ElementRef}) barraSuperior: ElementRef;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  fazerLogOut(){
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }

  revelaUsuario(){
    const usuario = new Usuario;

    this.authService.getCurrentUser().then(res=> {
      usuario.email = res.email;
      //console.log(res)
    });

    const config: MatDialogConfig<any> = (usuario) ? { data: { usuario } } : null;
    this.dialog.open(UserDialogComponent, config);
  }

  sairDialog(){
    this.dialog.open(SairDialogComponent);
  }

}
