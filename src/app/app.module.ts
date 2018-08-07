import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { FormsModule } from "../../node_modules/@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { 
  MatToolbarModule, 
  MatListModule, 
  MatLineModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCardModule,
} from "@angular/material";
import { TarefaItemComponent } from './tarefa-item/tarefa-item.component';
import { TarefaListComponent } from './tarefa-list/tarefa-list.component';
import { TarefaDialogComponent } from './tarefa-dialog/tarefa-dialog.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TarefaItemComponent,
    TarefaListComponent,
    TarefaDialogComponent,
    BarraSuperiorComponent,
    AuthenticationComponent,
    LoginComponent
  ],
  entryComponents: [
    TarefaDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
