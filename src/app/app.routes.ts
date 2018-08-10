import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './login/login.component';
import { TarefaListComponent } from './tarefa-list/tarefa-list.component';
//import { UserComponent } from './user/user.component';
//import { RegisterComponent } from './register/register.component';
//import { UserResolver } from './user/user.resolver';

export const rootRouterConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tarefas', component: TarefaListComponent , canActivate: [AuthGuard] }
  
  /*{ path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}}*/
];
