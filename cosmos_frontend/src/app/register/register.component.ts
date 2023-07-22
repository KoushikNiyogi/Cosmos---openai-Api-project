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

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const userData = { name: this.name, email: this.email, password: this.password };
    this.http.post<any>('http://localhost:5000/register', userData).subscribe(
      (response) => {
        this.router.navigate(['/login']); // Redirect to login page on successful registration
      },
      (error) => {
        this.toastr.error('Registration failed. Please try again later.'); // Display toast message on failure
        console.error('Error during registration:', error);
      }
    );
  }
}
