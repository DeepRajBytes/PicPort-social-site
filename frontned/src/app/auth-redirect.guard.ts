import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('JWT');
    if (token) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
