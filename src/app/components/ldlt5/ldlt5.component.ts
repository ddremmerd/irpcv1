import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { format } from 'util';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Type from 'src/models/VariablesType';


@Component({
  selector: 'app-ldlt5',
  templateUrl: './ldlt5.component.html',
  styleUrls: ['./ldlt5.component.css']
})
export class Ldlt5Component implements OnInit {

  content_header_name = "ระบบติดตาม GPS Tracking";

  //------------------get ddl api
  //----------------api/v1/ProcessCb/ShipmentType
  getShipmentType: Type.ResponseShipmentType;

  //---------------api/v1/ProcessCb/Carrier
  getCarrier: Type.ResponseCarrier;


  ShipType = new FormControl();
  shipTypeList: Array<string>;

  ShipType2 = new FormControl();

  transportName = new FormControl();
  transNameList: Array<string>;

  tranStatus = new FormControl();
  tranStatusList = [
    { "value": "1|2|3|4", "show": "รถขาเข้าโรงงาน" },
    { "value": "5|6|7|8", "show": "รถขาออกโรงงาน" }];

  shipNum = new FormControl();
  licenseNum = new FormControl();

  //------------------sim data for ddl
  sim_ShipType = {
    "result": [
      {
        "shipmenttypeid": 1,
        "code": "Z101",
        "description": "WMS Trk Deliver DOM"
      },
      {
        "shipmenttypeid": 2,
        "code": "Z102",
        "description": "WMS Trk Deliver EXP"
      },
      {
        "shipmenttypeid": 3,
        "code": "Z103",
        "description": "WMS Trk Deliver DSS"
      }
    ],
    "message": "OK"
  }

  sim_Carrier = {
    "result": [
      {
        "carrierid": 1,
        "code": "900069",
        "name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด"
      },
      {
        "carrierid": 2,
        "code": "112345",
        "name": "บริษัท เจ เอ ทรานสปอร์ต จำกัด"
      }
    ],
    "message": "OK"
  }



  TableHeader = ["Shipment No.", "สถานะรถ", "ผู้ขนส่ง", "ทะเบียนรถ", "ชื่อสกุล", "รถออก",
    "ถึง Feed", "ถึงลูกค้า", "ประมาณเวลาถึงลูกค้า"];

  TableData = [
    {
      shipNum: "ADSAD1212", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "ADSAD1212", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "AAAA222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "BBBB223232", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "CCCCC222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },
  ];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.getShipmentType = this.sim_ShipType as Type.ResponseShipmentType;
    this.getCarrier = this.sim_Carrier as Type.ResponseCarrier;

    this.createDropdown();
    console.log(this.getShipmentType, this.getCarrier)
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

  createDropdown() {
    if (this.getShipmentType != undefined) {
      if (this.getShipmentType.message == "OK") {
        let list_ary = [];
        for (let l = 0; l < this.getShipmentType.result.length; l++) {
          list_ary[l] = this.getShipmentType.result[l].description;
        }
        this.shipTypeList = list_ary;
      }
      else {
        console.log("message NOT OK");
      }
    }

    if (this.getCarrier != undefined) {
      if (this.getCarrier.message == "OK") {
        let list_ary = [];
        for (let l = 0; l < this.getCarrier.result.length; l++) {
          list_ary[l] = this.getCarrier.result[l].name;
        }
        this.transNameList = list_ary;
      }
      else {
        console.log("message NOT OK");
      }
    }

    console.log(this.transNameList, this.shipTypeList)

  }

  datatoSearch() {


    console.log(
      // this.ShipType.value,
      // this.transportName.value,
      // this.tranStatus.value,
      // this.shipNum.value,
      // this.licenseNum.value,
      this.ShipType2.value

    ) 
    if (this.ShipType2.value.length > 1) {
      console.log("more than 1 option");
    }

  }




}
