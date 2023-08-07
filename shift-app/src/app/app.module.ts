import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AdminRegisterComponent } from './components/register/admin-register/admin-register.component';
import { AdminLoginComponent } from './components/login/admin-login/admin-login.component';
import { AdminHomepageComponent } from './components/homepage/admin-homepage/admin-homepage.component';
import { AdminAllShiftsComponent } from './components/shifts/admin-all-shifts/admin-all-shifts.component';
import { AdminAllWorkersComponent } from './components/workers/admin-all-workers/admin-all-workers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HotToastModule } from '@ngneat/hot-toast';
import { UserLoginComponent } from './components/login/user-login/user-login.component';
import { UserRegisterComponent } from './components/register/user-register/user-register.component';
import { UserHomepageComponent } from './components/homepage/user-homepage/user-homepage.component';
import { UserShiftsComponentComponent } from './user-shifts-component/user-shifts-component.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
// import {AngularFirestore} from '@angular/fire/compat/firestore';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AdminEditProfileComponent } from './components/editprofile/admin-edit-profile/admin-edit-profile.component';
import { UserEditComponent } from './components/editprofile/user-edit/user-edit.component';
import { AdminEditAShiftComponent } from './components/shifts/admin-edit-a-shift/admin-edit-a-shift.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { UserPasswordResetComponent } from './components/user-password-reset/user-password-reset.component';
import { SearchPipe } from './search.pipe'; // import MatCardModule


@NgModule({
  declarations: [
    AppComponent,
    AdminRegisterComponent,
    AdminLoginComponent,
    AdminHomepageComponent,
    AdminAllShiftsComponent,
    AdminAllWorkersComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserHomepageComponent,
    UserShiftsComponentComponent,
    AdminEditProfileComponent,
    UserEditComponent,
    UserPasswordResetComponent,
    SearchPipe,
    AdminEditAShiftComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    HotToastModule.forRoot(),
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,

    // AngularFirestore
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
