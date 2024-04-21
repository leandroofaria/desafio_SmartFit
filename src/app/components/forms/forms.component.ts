
import { GetUnitsService } from './../../services/get-units.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor (private formBuilder: FormBuilder, private unitService: GetUnitsService) {
    
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })

    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    })
  }

  onSubmit() : void {
    if(!this.formGroup.value.showClosed) {
      this.filteredResults = this.results.filter(location => location.opened === true)
    } else {
      this.filteredResults = this.results
    }
  }

  onClean() : void {
    this.formGroup.reset();
  }


}
