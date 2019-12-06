import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { format } from 'util';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-ldlt5',
  templateUrl: './ldlt5.component.html',
  styleUrls: ['./ldlt5.component.css']
})
export class Ldlt5Component implements OnInit {

  content_header_name = "ระบบติดตาม GPS Tracking";

  ShipType = new FormControl();
  shipTypeList = ["Export", "Local"];

  transportName = new FormControl();
  transNameList = ["ตะวันรุ่ง ทรานส์", "Kerry Express", "DHL"];

  tranStatus = new FormControl();
  tranStatusList = ["10 km from User", "20 km from User", "30 km from User"];

  shipNum = new FormControl();
  licenseNum = new FormControl();

  TableHeader = ["Shipment No.", "สถานะรถ", "ผู้ขนส่ง", "ทะเบียนรถ", "ชื่อสกุล", "รถออก",
    "ถึง Feed", "ถึงลูกค้า", "ประมาณเวลาถึงลูกค้า"];

  TableData = [
    {shipNum: "ADSAD1212", carStatus: "LEAVING", transName:"KERRY", carLicense: "รย 98724",
    workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
    estTime: "3"},

    {shipNum: "ADSAD1212", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
    workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
    estTime: "3"},

    {shipNum: "AAAA222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
    workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
    estTime: "3"},

    {shipNum: "BBBB223232", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
    workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
    estTime: "3"},

    {shipNum: "CCCCC222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
    workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
    estTime: "3"},
  ];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  datatoSearch() {
    console.log(
      this.ShipType.value,
      this.transportName.value,
      this.tranStatus.value,
      this.shipNum.value,
      this.licenseNum.value
    )
  }

  
  

}
