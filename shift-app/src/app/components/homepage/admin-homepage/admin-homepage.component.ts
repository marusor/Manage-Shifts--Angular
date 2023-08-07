import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UsersService } from 'src/app/service/users.service';
import { myUser } from 'src/app/users/user';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
})
export class AdminHomepageComponent implements OnInit {
  currentUserProfile$: Observable<myUser | null>;

  constructor(
    private authService: AuthentificationService,
    private usersService: UsersService,
    private firestore: AngularFirestore
  ) {}
  ngOnInit(): void {
    this.currentUserProfile$ = this.usersService.currentUserProfile$;
  }
}
