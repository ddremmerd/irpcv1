import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})

export class DatePickerComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  selected_date: string;

  @Output() FindDateSelected = new EventEmitter();

  constructor() { }

  ngOnInit() {
    //get date time now
    // const moment = require('moment');
    // let now = moment().format("YYYY-MM-DDTHH:mm:ss");
    // this.FindDateSelected.emit(now);
    // console.log(now);

  }



  GetDate(event, date) {
    // console.log(date);
    this.selected_date = date.format("YYYY-MM-DDTHH:mm:ss");
    this.FindDateSelected.emit(this.selected_date);
  }

}
