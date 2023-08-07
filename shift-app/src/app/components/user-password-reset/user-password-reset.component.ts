import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.scss']
})
export class UserPasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  email: string;

  constructor(private router:Router, private firebaseAuth: AngularFireAuth, private toastr:HotToastService) {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ForgotPassword(email: string){
    return this.firebaseAuth
      .sendPasswordResetEmail(email)
      .then(()=>{
        
        this.toastr.success('A reset password link was sent, check your inbox.');
        setTimeout(() => {
          this.router.navigate(['/userlogin']);
        }, 2000);
      })
      .catch((error)=>{
        this.toastr.error(error.message);
      })
      
  }

  ngOnInit(): void {
    
  }
}
