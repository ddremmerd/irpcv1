import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  @Input() datepickName: string
  @Input() index_row: number;
  //Received Date time for set StartAt
  @Input() setDate: string;
  setTimee: string;

  //Send selected new date and time to Other component
  @Output() SelectedTime = new EventEmitter();
  selected_time: string;
  ObjectSelected: {
    datepickName: string,
    rowIndex: number,
    selected_time: string
  };

  constructor() { }

  ngOnInit() {

    let set_hh = moment(this.setDate).hour();
    let set_mm = moment(this.setDate).minute();
    this.setTimee = set_hh + ":" + set_mm;

    this.selected_time = this.setTimee;
  }

  timeChanged(t) {
    // console.log("******", t)
    this.selected_time = t;
    this.emitTime();
  }

  emitTime() {
    this.ObjectSelected = {
      datepickName: this.datepickName,
      rowIndex: this.index_row,
      selected_time: this.selected_time
    };

    // console.log(this.ObjectSelected)
    this.SelectedTime.emit(this.ObjectSelected);
  }



}
