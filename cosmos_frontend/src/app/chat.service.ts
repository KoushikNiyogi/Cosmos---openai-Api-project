import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private backendUrl = 'http://localhost:5000/query';

  constructor(private http: HttpClient) { }

  postQuery(query: string): Observable<any> {
    return this.http.post<any>(this.backendUrl, { query });
  }
}
