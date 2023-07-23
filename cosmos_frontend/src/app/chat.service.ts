import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  // Define the getSingleChat method to fetch chat history for a specific chat ID
  getSingleChat(chatId: string) {
    return this.http.get<any>(`https://cosmos-backend-zhnd.onrender.com/get_single_chat/${chatId}`);
  }

  // Define the postQuery method to send queries to the backend
  postQuery(chatId: string, query: string) {
    return this.http.post<any>(`https://cosmos-backend-zhnd.onrender.com/query/${chatId}`, { query: query });
  }
  
}
