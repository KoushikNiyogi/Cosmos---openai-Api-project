import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  query: string = '';
  chatHistory: { user: string, response: string }[] = [];

  constructor(private chatService: ChatService) { }

  sendQuery() {
    console.log(this.query);
    this.chatHistory.push({ user: this.query, response: 'Loading...' });

    this.chatService.postQuery(this.query).subscribe(
      (response) => {
        console.log(response.msg)
        const lastChat = this.chatHistory[this.chatHistory.length - 1];
        lastChat.response = response.msg;
      },
      (error) => {
        const lastChat = this.chatHistory[this.chatHistory.length - 1];
        lastChat.response = 'Error fetching response.';
        console.error('Error while fetching response:', error);
      }
    );

    this.query = ''; // Clear the query value after sending the query
  }
  

}
