import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UsersService } from 'src/app/service/users.service';
import { myUser } from 'src/app/users/user';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent implements OnInit {

  currentUserProfile$: Observable<myUser | null>;
  shifts$: Observable<any[]> 
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
  searchText = '';




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

  constructor(private authService: AuthentificationService, private usersService: UsersService,private firestore: AngularFirestore, private formBuilder: FormBuilder,  private afAuth: AngularFireAuth) {}

 
 

  ngOnInit() {
    this.currentUserProfile$ = this.usersService.currentUserProfile$;
   
    
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
      comments: ['', Validators.required]
    });
  
 
  }


  getShifts() {
     this.firestore.collection('users').doc(this.uid).collection('Shifts').valueChanges().subscribe((shifts: any[]) => {
      this.shifts = shifts;
     });
 }


 
}
