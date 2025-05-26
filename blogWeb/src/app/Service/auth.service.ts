import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  // Simulated user database
  private users = [
    { email: 'aibragimov2003@bk.ru', password: 'a41d54bb6a4bed7b4d2f8d2d8be74506ebaf00cd5ab32919e4016e4a73bbe7d5' }, 
  ];

  // Login method
  login(credentials: { email: string; password: string }) {
    const user = this.users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      localStorage.setItem('token', 'fake-jwt-token'); // Simulate a JWT token
      this.loggedIn.next(true);
      this.router.navigate(['/view-all']); // Redirect to the view-all page
    } else {
      alert('Invalid email or password');
    }
  }

  // Logout method
  logout() {
    localStorage.removeItem('token'); // Remove the fake token
    this.loggedIn.next(false);
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Check if the user is logged in
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Get the fake JWT token
  getToken() {
    return localStorage.getItem('token');
  }
}
