import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Firestore } from '@firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { map, Observable, tap } from 'rxjs';
import { Shifts } from 'src/app/shifts/shifts';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-admin-all-shifts',
  templateUrl: './admin-all-shifts.component.html',
  styleUrls: ['./admin-all-shifts.component.scss'],

  providers: [DatePipe],
})
export class AdminAllShiftsComponent implements OnInit {
  shifts: Observable<Shifts[]>;
  searchFName: string;
  searchPlace: string;

  constructor(
    private firestore: AngularFirestore,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    console.log('Retrieving shifts...');
    this.shifts = this.firestore
      .collection<Shifts>('Shifts')
      .valueChanges()
      .pipe(
        tap((shifts) => console.log('Shifts retrieved:', shifts)),
        map((shifts) => {
          console.log('Mapping shifts...');
          return shifts.map((shift) => {
            const date = this.datePipe.transform(
              shift.date.toDate(),
              'dd/MM/yyyy'
            );
            return {
              ...shift,
              date: date,
            };
          });
        }),
        tap((mappedShifts) => console.log('Shifts mapped:', mappedShifts))
      );
  }
  search() {
    this.shifts = this.firestore
      .collection<Shifts>('Shifts')
      .valueChanges()
      .pipe(
        map((shifts) =>
          shifts.map((shift) => {
            const date = this.datePipe.transform(
              shift.date.toDate(),
              'dd/MM/yyyy'
            );
            return { ...shift, date: date };
          })
        ),
        map((shifts) =>
          shifts.filter(
            (shift) =>
              (!this.searchFName ||
                shift.fName
                  .toLowerCase()
                  .includes(this.searchFName.toLowerCase())) &&
              (!this.searchPlace ||
                shift.workplace
                  .toLowerCase()
                  .includes(this.searchPlace.toLowerCase()))
          )
        )
      );
  }
  reset() {
    this.searchFName = '';
    this.searchPlace = '';
    this.shifts = this.firestore
      .collection<Shifts>('Shifts')
      .valueChanges()
      .pipe(
        map((shifts) =>
          shifts.map((shift) => {
            const date = this.datePipe.transform(
              shift.date.toDate(),
              'dd/MM/yyyy'
            );
            return { ...shift, date: date };
          })
        )
      );
  }
}
