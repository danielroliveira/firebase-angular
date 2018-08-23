import { Router } from '@angular/router';
import { 
  Component, 
  Output,
  EventEmitter
} from '@angular/core';

import { MatDialog, MatDialogConfig  } from '@angular/material';

import { AuthService } from '../login/auth.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrls: ['./barra-superior.component.scss']
})
export class BarraSuperiorComponent {
   
  navIsFixed: boolean = true;
  
  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  // ao alterar o valor de tarefa feita boolean
  @Output() LogOut = new EventEmitter();

  fazerLogOut(){
    this.LogOut.emit()
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

}
