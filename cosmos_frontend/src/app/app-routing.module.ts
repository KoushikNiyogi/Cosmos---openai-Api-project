import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'chatlist',component: ChatListComponent, canActivate: [AuthGuard]},
  { path: 'chat/:chatid', component: ChatComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect to home page if route not found
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
