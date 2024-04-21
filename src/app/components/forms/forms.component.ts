import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from './../../services/get-units.service';
import { FilterUnitsService } from './../../services/filter-units.service';
import { Location } from 'C:/Users/leand/desafio_SmartFit/src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  formGroup!: FormGroup;
  filteredResults: Location[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });

    this.unitService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  onSubmit(): void {
    let {showClosed, hour} = this.formGroup.value
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitService.setFilteredUnits(this.filteredResults)
  }

  onClean(): void {
    this.formGroup.reset();
  }
}
