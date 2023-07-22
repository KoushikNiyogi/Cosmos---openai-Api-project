import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'chatlist',component: ChatListComponent},
  { path: 'chat/:chatid', component: ChatComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect to home page if route not found
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
