import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const userData = { email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/login', userData).subscribe(
      (response) => {
        // Redirect to chat page on successful login
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/chatlist']);
      },
      (error) => {
        // Display toast message on login failure
        this.toastr.error('Invalid email or password. Please try again.');
        console.error('Login failed:', error);
      }
    );
  }
}
