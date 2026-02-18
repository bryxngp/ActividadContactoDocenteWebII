import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  private authService = inject(AuthService);
  private router = inject(Router);


  cerrarSesion() {

    this.router.navigate(['/login']).then((permitido) => {


      if (permitido) {

        this.authService.logout();
        console.log('Sesión cerrada en Patitas 🐾');
      }
    });

  }

}
