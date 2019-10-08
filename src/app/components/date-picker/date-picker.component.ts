import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  // ชื่อฟังก์ชั่น : ruturn type
  btnClicked(): void {
    console.log("clicked!");
  }

  constructor() { }

  ngOnInit() {
  }



}
