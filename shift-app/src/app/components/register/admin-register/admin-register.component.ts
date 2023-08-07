import { Component, OnInit } from '@angular/core';
import { User, user } from '@angular/fire/auth';
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
import { switchMap, take } from 'rxjs';
import { AuthentificationService } from 'src/app/service/authentification.service';
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
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss'],
})
export class AdminRegisterComponent implements OnInit {
  submit() {
    if (!this.adminSignUpForm.valid) return;

    const { fName, lName, email, password, confirmPassword, age } =
      this.adminSignUpForm.value;

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
          admin: true,
          date: undefined
        };
        this.usersService.addUser(user);
        this.router.navigate(['/adminhome']);
      });
  }

  ngOnInit(): void {}

  adminSignUpForm = new FormGroup(
    {
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private authService: AuthentificationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService
  ) {}

  get fName() {
    return this.adminSignUpForm.get('fName');
  }

  get lName() {
    return this.adminSignUpForm.get('lName');
  }

  get email() {
    return this.adminSignUpForm.get('email');
  }
  get password() {
    return this.adminSignUpForm.get('password');
  }
  get confirmPassword() {
    return this.adminSignUpForm.get('confirmPassword');
  }
  get age() {
    return this.adminSignUpForm.get('age');
  }
}
