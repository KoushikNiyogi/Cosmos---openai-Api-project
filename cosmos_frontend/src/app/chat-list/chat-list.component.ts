import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: any[] = [];
  newChatName: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
   this.fetchChats()
  }

  
  fetchChats() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;

      // Make a request to the backend endpoint to get the list of chats
      if (userId) {
        this.http.get<any>(`https://cosmos-backend-zhnd.onrender.com/get_chat/${userId}`).subscribe(
          (response) => {
            this.chats = response.chats;
          },
          (error) => {
            console.error('Error fetching chats:', error);
          }
        );
      }
    }
  }

  // Function to redirect to the chat page with the selected chat ID
  goToChat(chatId: string) {
    this.router.navigate(['/chat', chatId]);
  }

  addChat() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
  
      // Make a request to the backend endpoint to add the new chat
      if (userId && this.newChatName) {
        this.http
          .post<any>(`https://cosmos-backend-zhnd.onrender.com/add_chat`, { name: this.newChatName, _id: userId })
          .subscribe(
            (response) => {
              // Update the chat list after successful addition
              this.fetchChats()// Update the entire chat list with the new response
              this.newChatName = ''; // Clear the input box after adding the chat
            },
            (error) => {
              console.error('Error adding chat:', error);
            }
          );
      }
    }
  }
  
}
