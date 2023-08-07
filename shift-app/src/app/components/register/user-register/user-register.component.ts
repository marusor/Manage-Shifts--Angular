import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HotToastService } from '@ngneat/hot-toast';
import { take } from 'rxjs';
import { AuthentificationService } from 'src/app/service/authentification.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DatabaseServiceService } from 'src/app/service/database-service.service';
import { UsersService } from 'src/app/service/users.service';
import { myUser } from 'src/app/users/user';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword && password && confirmPassword) {
      return { passwordsDontMatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  userRegistration = new FormGroup(
    {
      // admin: new FormControl('false'),
      // uid: new FormControl(''),
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
      confirmPassword: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(130),
      ]),
    },
    { validators: passwordsMatchValidator() }
  );

  submit() {
    if (!this.userRegistration.valid) return;

    const { fName, lName, email, password, confirmPassword, age } =
      this.userRegistration.value;
    this.authService
      .adminSignUp(email, password)
      .pipe(take(1))
      .subscribe((res) => {
        const user: myUser = {
          uid: res.user.uid,
          lName: lName,
          fName: fName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          age: +age,
          admin: false,
          date: undefined
        };
        this.usersService.addUser(user);
        this.router.navigate(['/userlogin']);
      });
  }

  constructor(
    private authService: AuthentificationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService
  ) // private firestore: AngularFirestore

  {}
  ngOnInit(): void {}
  get fName() {
    return this.userRegistration.get('fName');
  }

  get lName() {
    return this.userRegistration.get('lName');
  }

  get email() {
    return this.userRegistration.get('email');
  }
  get password() {
    return this.userRegistration.get('password');
  }
  get confirmPassword() {
    return this.userRegistration.get('confirmPassword');
  }
  get age() {
    return this.userRegistration.get('age');
  }
}
