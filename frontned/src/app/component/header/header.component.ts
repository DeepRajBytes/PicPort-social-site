import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

isScrolled = false;


  constructor(private router: Router) {}


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = verticalOffset > 0;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('JWT');
  }
  
 

  logout() {
    localStorage.removeItem('JWT');
    this.router.navigate(['/login']);
  }


}