import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UsersService } from 'src/app/service/users.service';
import { myUser } from 'src/app/users/user';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-admin-all-workers',
  templateUrl: './admin-all-workers.component.html',
  styleUrls: ['./admin-all-workers.component.scss'],
})
export class AdminAllWorkersComponent implements OnInit {
  workers: any[] = [];
  displayedColumns: string[] = ['email', 'password', 'fName', 'lName', 'age'];
  pageSize = 10;
  ngOnInit(): void {
    // Fetching workers data from Firestore and assign it to the workers property

    this.firestore
      .collection('Database')
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const worker = doc.data();
          this.workers.push(worker);
        });
        console.log(this.workers);
      });
  }
  constructor(
    private authService: AuthentificationService,
    private usersService: UsersService,
    private firestore: AngularFirestore
  ) {}
}
