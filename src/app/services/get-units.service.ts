import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response-interface';
import { Location } from 'C:/Users/leand/desafio_SmartFit/src/app/types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {

  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"


  private allUnitsSubjects: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);

  private allUnits$: Observable<Location[]> = this.allUnitsSubjects.asObservable();

  private filteredUnits: Location[] = [];


  constructor(private httpClient: HttpClient) {
     this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubjects.next(data.locations);
      this.filteredUnits = data.locations
    });
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits() {
    return this.filteredUnits;

  }

  setFilteredUnits(value: Location[]) {
    this.filteredUnits = value;
  }
}
