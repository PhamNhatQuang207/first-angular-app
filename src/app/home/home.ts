import { Component,inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent,CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let location of filteredLocationList" [housingLocation]="location" ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  constructor() {
    this.housingService.getAllHousingLocations().then(locations => {
      this.housingLocationList = locations
      this.filteredLocationList = locations;
    });
  }
    filterResults(text: string) {
      if(!text) this.filteredLocationList = this.housingLocationList;
      
      this.filteredLocationList = this.housingLocationList.filter(location =>
        location.city?.toLowerCase().includes(text.toLowerCase())
      );
      this.filteredLocationList = this.housingLocationList.filter(location =>
        location.name?.toLowerCase().includes(text.toLowerCase())
      );
    }
}
