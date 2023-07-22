import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatHomeComponent,
    RegisterComponent,
    LoginComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Add the FormsModule to the imports
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
