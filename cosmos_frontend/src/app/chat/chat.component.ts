import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  query: string = '';
  chatId: string = ''; // To store the chat ID from the route
  chatHistory: { type: string; msg: string }[] = [];

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.chatId = params['chatid'];
      this.fetchChatHistory(this.chatId); // Call the function to fetch chat history
    });
  }

  // Function to fetch chat history based on chat ID
  fetchChatHistory(chatId: string) {
    console.log(chatId)
    this.chatService.getSingleChat(chatId).subscribe(
      (response) => {
        this.chatHistory = response.chat.chat_history; // Update the chat history with the received response
        console.log(this.chatHistory);
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
  }

  sendQuery() {
    console.log(this.query);
    
    this.route.params.subscribe((params) => {
      this.chatId = params['chatid'];
      this.chatService.postQuery(this.chatId, this.query).subscribe(
        (response) => {
          console.log(response);
          this.fetchChatHistory(this.chatId)
        },
        (error) => {
          console.error('Error while fetching response:', error);
        }
      );
    });
  
    this.query = '';
  } // Clear the query value after sending the query
  }
  
