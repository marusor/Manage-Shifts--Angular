import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-user-shifts-component',
  templateUrl: './user-shifts-component.component.html',
  styleUrls: ['./user-shifts-component.component.scss']
})


export class UserShiftsComponentComponent implements OnInit {

 
  shifts$: Observable<any[]>;
  shiftForm: FormGroup;
  currentUserUid: string;
  locationOptions: string[] = ['Oradea', 'Timisoara', 'Bucuresti'];
  normalPayRate = 10;
  startHour: number;
  endHour: number;
  uid: string;
  shifts: any[]= [];
  fromDate: string;
  toDate: string;
  bestMonth = '';
  bestMonthProfit = 0;
  location: string
  uniqueId: string;
  comments: string;


  
  calculateBestMonth() {
    
    let monthTotals: {[key: string]: number} = {};
    for (const shift of this.shifts) {
      const date = new Date(shift.date);
      const month = date.toLocaleString('default', { month: 'long' });
      const profit = parseFloat(shift.finalProfit.slice(1));
      monthTotals[month] = (monthTotals[month] || 0) + profit;

    }
    
    let maxProfit: number = 0;
    for (const [month, profit] of Object.entries(monthTotals)) {
      if (profit > maxProfit) {
        maxProfit = profit;
        this.bestMonth = month;
        this.bestMonthProfit = profit;
      }
    }
  }

  
  payOptions: any[] = [
    { label: 'Normal', value: 1 },
    { label: 'Overtime (x1.5)', value: 1.5 },
    { label: 'Double Time (x2)', value: 2 }
  ];

  constructor(private firestore: AngularFirestore, private formBuilder: FormBuilder,  private afAuth: AngularFireAuth, private toastr: HotToastService) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.shifts$ = this.firestore.collection('users').doc(this.uid).collection('Shifts').valueChanges();
        this.shifts$.subscribe(shifts => {
         
          this.shifts = shifts;
          this.calculateBestMonth();
        });
      }
    });
    
    this.shiftForm = this.formBuilder.group({
      fromDate: [''],
  toDate: [''],
  location1: [''],
      date: ['', Validators.required],
      startHour: ['', Validators.required],
      endHour: ['', Validators.required],
      location: ['', Validators.required],
      payOption: [this.payOptions[0].value, Validators.required],
      uniqueId: ['', Validators.required],
      comments: ['', Validators.required],
      
    });
  }
  getShifts() {
     this.firestore.collection('users').doc(this.uid).collection('Shifts').valueChanges().subscribe((shifts: any[]) => {
      this.shifts = shifts;
     });
 }
  addShift() {
    const { date, startHour, endHour, location, payOption, uniqueId, comments } = this.shiftForm.value;

  // Verify that endHour is not before startHour
  const [startHourFinal, startMinute] = startHour.split(':');
  const [endHourFinal, endMinute] = endHour.split(':');
  const startDate = new Date();
  startDate.setHours(startHourFinal);
  startDate.setMinutes(startMinute);

  const endDate = new Date();
  endDate.setHours(endHourFinal);
  endDate.setMinutes(endMinute);

  if (endDate.getTime() <= startDate.getTime()) {
    this.toastr.error('The end time cannot be before the start time.');
    return;
  }
  this.firestore.collection('users').doc(this.uid).collection('Shifts').ref.where('uniqueId', '==', uniqueId).get().then((snapshot) => {
    if (snapshot.size > 0) {
      // Unique Id already exists in Firestore database
      this.toastr.error('Error: Unique Id already exists');
    } else {
      // Unique Id does not exist in Firestore database, add new shift
      const hoursWorked = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
      let payRate = this.normalPayRate;
      let payTypeMultiplier = payOption === 1 ? 1 : payOption === 1.5 ? 1.5 : 2;
      const profit = hoursWorked * payTypeMultiplier * payRate;
      const finalProfit = '$' + profit.toFixed(2);
      this.firestore.collection('users').doc(this.uid).collection('Shifts').add({
        date,
        startHour,
        endHour,
        location,
        payOption,
        payRate,
        finalProfit,
        uniqueId,
        comments
      }).then(() => {
        this.shiftForm.reset();
        this.calculateBestMonth();
       ;
      });
    }
  });
  }
}
