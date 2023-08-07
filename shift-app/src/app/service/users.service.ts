import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { from, Observable, of, switchMap } from 'rxjs';
import { myUser } from '../users/user';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get currentUserProfile$(): Observable<myUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'Database', user?.uid);
        return docData(ref) as Observable<myUser>;
      })
    );
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthentificationService
  ) {}

  addUser(user: myUser): Observable<any> {
    const ref = doc(this.firestore, 'Database', user?.uid);
    return from(setDoc(ref, user));
  }
}
