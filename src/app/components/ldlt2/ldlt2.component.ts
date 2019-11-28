import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { format } from 'util';

@Component({
  selector: 'app-ldlt2',
  templateUrl: './ldlt2.component.html',
  styleUrls: ['./ldlt2.component.css']
})
export class Ldlt2Component implements OnInit {

  content_header_name = "ระบบติดตาม Shipment กลาง (Shipment Tracking)";

  plantNum = new FormControl();
  plantList: string[] = ['PP1', 'PP2', 'PP3', 'PP4', 'PP5', 'PP5'];

  warehouseNum = new FormControl();
  warehouseList: string[] = ['WH1', 'WH2', 'WH3', 'WH4', 'WH5', 'WH6', 'WH7'];

  shipmentType = new FormControl();
  shipmenttypeList: string[] = ['Local', 'Export'];

  statusNum = new FormControl();
  statusList: string[] = ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5'];


  checked = false;

  tableHeader = ["Loading Date", "Shipment Type",
    "DC No.", "Status",
    "Deliver No.", "Shipment No."];

  tableData = [
    // {
    //   loadingDate: "20-11-2019",
    //   shipType: "Z103",
    //   dcNo: "WH40",
    //   // status:"create shipment", 
    //   shipmentNo: "62123"
    // },

    {
      loadingDate: "21-11-2019",
      shipType: "Z105",
      dcNo: "WH44",
      // status:"Planning Time", 
      shipmentNo: "66666"
    }



    // {
    //   loadingDate: "22-11-2019",
    //   shipType: "Z115",
    //   dcNo: "WH40",
    //   status: "Planning Time", cusPickup: "10-395 สมเดช",
    //   shipmentNo: "66666", deliverNo: "30219123", matDoc: "Default",
    //   grade: "1102K", lot: "123019", quantity: "10000",
    //   truckload: "15000", customer: "ABC", planningTime: "09:00",
    //   prodPrepTime: "08:30", truckCheckTime: "08:50", driverCheckTime: "08:30",
    //   LoadingTime: "09:00", weightinTime: "09:12",
    //   labourRegTime: "09:35", weightoutTime: "09:39"


    // }



  ];

  constructor() { }

  ngOnInit() {

  }



  datatoSearch() {
    console.log(Math.floor(Date.now() / 1000)+"ค้นหา");
    console.warn(this.plantNum.value);

  }


  refresh(check){

   
      if(check.checked == true){
        var t = setInterval(this.datatoSearch, 5000);
      }else{
        console.log("cancel refresh");
        clearInterval(t);
      }
      
    
 
  }

  


}
