import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './service/authentification.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: any;
  constructor(private sanitizer: DomSanitizer,
    public authService: AuthentificationService,
    private router: Router
  ) {
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/adminlogin']);
    });
  }
}
