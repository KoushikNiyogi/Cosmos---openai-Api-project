import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  showToast: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password };
    this.http.post<any>('https://cosmos-backend-zhnd.onrender.com/register', userData).subscribe(
      (response) => {
        this.router.navigate(['/login']); // Redirect to login page on successful registration
      },
      (error) => {
        this.showToast = true;
        console.error('Login failed:', error);
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
        console.error('Error during registration:', error);
      }
    );
  }
  closeToast() {
    this.showToast = false;
  }
}
