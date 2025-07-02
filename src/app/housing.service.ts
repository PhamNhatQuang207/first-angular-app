import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'https://localhost:7038/api/HousingLocations'; // Update this to your backend URL
  constructor(private http: HttpClient) { }

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url).pipe(
      catchError(error => {
        console.error('Error fetching all housing locations:', error);
        return throwError(() => error);
      })
    );
  }
  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching housing location by id:', error);
        return throwError(() => error);
      })
    );
  }
  submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(`Application submitted by ${firstName} ${lastName} with email ${email}`);
  }
}
