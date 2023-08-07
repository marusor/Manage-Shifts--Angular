import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { passwordsMatchValidator } from '../../register/admin-register/admin-register.component';
import { AdminAllWorkersComponent } from '../../workers/admin-all-workers/admin-all-workers.component';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.scss'],
})
export class AdminEditProfileComponent implements OnInit {
  user$ = this.authService.currentUser$;

  userUpdateAdmin = new FormGroup(
    {
      fName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      age: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(130),
      ]),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthentificationService
  ) {}

  ngOnInit(): void {
    console.log(this.user$);
    // Get the email parameter from the route
    this.route.params.subscribe((params) => {
      const email = params['email'];
      this.firestore
        .collection('Database', (ref) => ref.where('email', '==', email))
        .get()
        .subscribe((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const user = doc.data();
            this.userUpdateAdmin.patchValue(user);
          });
        });
    });
  }

  update() {
    if (!this.userUpdateAdmin.valid) {
      return;
    } else {
      this.route.params.subscribe((params) => {
        const email = params['email'];
        const {
          fName,
          lName,
          age,
          email: newEmail,
          password,
          confirmPassword,
        } = this.userUpdateAdmin.value;
        // Update the user's data in Firestore
        this.firestore
          .collection('Database', (ref) => ref.where('email', '==', email))
          .get()
          .subscribe((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.update({
                fName,
                lName,
                age,
                email: newEmail,
                password: password,
                confirmPassword,
              });
              console.log('User updated successfully!');
              this.router.navigate(['/allworkers']);
            });
          });
      });
    }
  }

  get fName() {
    return this.userUpdateAdmin.get('fName');
  }

  get lName() {
    return this.userUpdateAdmin.get('lName');
  }

  get email() {
    return this.userUpdateAdmin.get('email');
  }

  get age() {
    return this.userUpdateAdmin.get('age');
  }
  get newPassword() {
    return this.userUpdateAdmin.get('password');
  }
  get confirmNewPassword() {
    return this.userUpdateAdmin.get('confirmPassword');
  }
}
