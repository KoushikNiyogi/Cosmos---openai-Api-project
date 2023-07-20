import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import the FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatHomeComponent } from './chat-home/chat-home.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatHomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, // Add the FormsModule to the imports
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
