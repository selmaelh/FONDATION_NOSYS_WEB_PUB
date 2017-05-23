import { Component } from '@angular/core';
import {RouterModule,Routes,Router} from '@angular/router';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import * as moment from 'moment';

@Component({
  templateUrl: './proposition.component.html'
})


export class PropositionComponent {

  date: DateModel;
  options: DatePickerOptions;
 
  constructor() {
	moment.locale('fr');
    this.options = {
			  locale: "fr",
			};
	}
}
