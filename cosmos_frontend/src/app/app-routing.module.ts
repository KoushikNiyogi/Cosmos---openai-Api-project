import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: ChatHomeComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Redirect to home page if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
