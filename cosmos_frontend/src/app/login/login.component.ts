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
  showToast: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const userData = { email: this.email, password: this.password };
    this.http.post<any>('https://cosmos-backend-zhnd.onrender.com/login', userData).subscribe(
      (response) => {
        // Redirect to chat page on successful login
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/chatlist']);
      },
      (error) => {
        // Display toast message on login failure
        this.showToast = true;
        console.error('Login failed:', error);
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    );
  }
}
