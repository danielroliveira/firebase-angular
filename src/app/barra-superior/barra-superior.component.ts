import { 
  Component, 
  Output,
  EventEmitter
} from '@angular/core';

import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';

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
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
    });

    const config: MatDialogConfig<any> = (usuario) ? { data: { usuario } } : null;
    const dialogRef = this.dialog.open(UserDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const resposta = this.authService
          .verificaUsuarioSenha(usuario.email, result.senhaAntiga);
        
        resposta.then((data)=>{
          if(data.resultado){
            const alteracao = this.authService.changeCurrentUserPass(result.novaSenha)

            alteracao.then(()=>{
              this.showSnackBar('Senha alterada com sucesso!', false);
            }).catch((data)=> {
              this.showSnackBar('Senha não foi alterada... Dados incorretos!', true);
            })
          } else {
            this.showSnackBar('Senha não foi alterada... Dados incorretos!', true);
          }
        })
      }
    });
  }

  showSnackBar(message: string, alert: boolean){
    if (alert){
      this.snackBar.open(message, 'OK', {duration: 2000, panelClass: 'snackBarAlert'})
    } else {
      this.snackBar.open(message, 'OK', {duration: 2000})
    }
  }

}
