import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from "../../node_modules/@angular/router";
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
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
import { LoginComponent } from './login/login.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TarefaItemComponent,
    TarefaListComponent,
    TarefaDialogComponent,
    BarraSuperiorComponent,
    LoginComponent,
    UserDialogComponent
  ],
  entryComponents: [
    TarefaDialogComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
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
