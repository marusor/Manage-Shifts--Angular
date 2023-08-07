import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { passwordsMatchValidator } from '../../register/admin-register/admin-register.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user$ = this.authService.currentUser$;
  userUpdate = new FormGroup({
    fName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    lName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),

    age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(130)])
  },{validators: passwordsMatchValidator()});

  constructor(private router: Router, private firestore: AngularFirestore, private authService: AuthentificationService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(res=>{
       this.firestore.collection('Database').doc(res.uid).get().subscribe(doc => {
        if (doc.exists) {
          const user = doc.data();
          this.userUpdate.patchValue(user);
        }
      });
    });
   
 
  }

  update() {
    if (!this.userUpdate.valid) {
      return;
    }

    this.authService.currentUser$.subscribe(res=>{
      this.firestore.collection('Database').doc(res.uid).update({ fName, lName, email, age,  newPassword, confirmNewPassword  })
      .then(() => {
        console.log('User updated successfully!');
        this.router.navigate(['/userhome']);
      })
      .catch(error => {
        console.error('Error updating user: ', error);
      });
     
   });
    const { fName, lName, email, age, newPassword, confirmNewPassword } = this.userUpdate.value;

    // update the user in Firestore
   
  }

  get fName() {
    return this.userUpdate.get('fName');
  }

  get lName() {
    return this.userUpdate.get('lName');
  }

  get email() {
    return this.userUpdate.get('email');
  }

  get age() {
    return this.userUpdate.get('age');
  }
  get newPassword(){
    return this.userUpdate.get('newPassword')
  }
  get confirmNewPassword(){
    return this.userUpdate.get('confirmNewPassword')
  }
} 
// import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { User } from 'firebase/auth';
// import { Observable } from 'rxjs';
// import { AuthentificationService } from 'src/app/service/authentification.service';

// @Component({
//   selector: 'app-user-edit',
//   templateUrl: './user-edit.component.html',
//   styleUrls: ['./user-edit.component.scss']
// })
// export class UserEditComponent implements OnInit {
//   user$: Observable<User>;
//   uid: string;

//   userUpdate = new FormGroup({
//     fName: new FormControl('', [Validators.required, Validators.minLength(2)]),
//     lName: new FormControl('', [Validators.required, Validators.minLength(2)]),
//     email: new FormControl('', [Validators.email, Validators.required]),
//     newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     age: new FormControl('', [Validators.required, Validators.min(6), Validators.max(130)])
//   });

//   constructor(
//     private router: Router,
//     private firestore: AngularFirestore,
//     private authService: AuthentificationService

//   ) {}

//   ngOnInit() {
//     this.user$ = this.authService.currentUser$;
//     this.user$.subscribe(user => {
//       this.uid = user.uid;
//       this.firestore.collection('Database').doc(this.uid).get().subscribe(doc => {
//         if (doc.exists) {
//           const data = doc.data();
//           this.userUpdate.patchValue(data);
//         }
//       });
//     });
//   }

//   update() {
//     if (!this.userUpdate.valid) {
//       return;
//     }

//     const { fName, lName, email, age, newPassword, confirmNewPassword } = this.userUpdate.value;

//     // update the user in Firestore
//     this.firestore.collection('Database').doc(this.uid).update({ fName, lName, email, age, newPassword, confirmNewPassword })
//       .then(() => {
//         console.log('User updated successfully!');
//         this.router.navigate(['/userhome']);
//       })
//       .catch(error => {
//         console.error('Error updating user: ', error);
//       });
//   }


//   get fName() {
//     return this.userUpdate.get('fName');
//   }

//   get lName() {
//     return this.userUpdate.get('lName');
//   }

//   get email() {
//     return this.userUpdate.get('email');
//   }

//   get age() {
//     return this.userUpdate.get('age');
//   }

//   get newPassword(){
//     return this.userUpdate.get('newPassword')
//   }

//   get confirmNewPassword(){
//     return this.userUpdate.get('confirmNewPassword')
//   }
// }
