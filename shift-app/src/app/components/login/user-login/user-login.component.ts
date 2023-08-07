import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
 
  userLogin = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email,]),
    password: new FormControl('',Validators.required)
  })
 constructor( private authService: AuthentificationService,
  private router: Router,
  private toast: HotToastService){
 
 }

 ngOnInit(): void {
   
 }
 get email(){
  return this.userLogin
 }
 get password(){
  return this.userLogin
 }
 submit() {
  if (!this.userLogin.valid) {
    return;
  }

  const { email, password } = this.userLogin.value;
  this.authService
    .login(email, password)
    .pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: 'There was an error',
      })
    )
    .subscribe(() => {
      this.router.navigate(['/userhome']);
    });
}
 
}
