import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo" alt="Photo of {{ housingLocation?.name }}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="listing-heading">About this housing</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Wifi: {{ housingLocation?.wifi ? 'Yes' : 'No' }}</li>
          <li>Laundry: {{ housingLocation?.laundry ? 'Yes' : 'No' }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="listing-heading">Apply Now</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" >
          <label id="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" >
          <label for="email">Email</label>
          <input id="email" type="text" formControlName="email" >
          <button type="submit" class="primary">Apply Now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.css']
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get('id'));
    this.housingService.getHousingLocationById(housingLocationId).subscribe(location => {
      this.housingLocation = location;
    });
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
