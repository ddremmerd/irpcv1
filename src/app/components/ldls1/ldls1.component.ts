import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { format } from 'util';
@Component({
  selector: 'app-ldls1',
  templateUrl: './ldls1.component.html',
  styleUrls: ['./ldls1.component.css']
})
export class Ldls1Component implements OnInit {

  content_header_name = "ระบบ Manual สำหรับเริ่มงาน / สำหรับ Forklift";

  warehouseNum = new FormControl();
  warehouseList: string[] = ['WH1', 'WH2', 'WH3', 'WH4', 'WH5', 'WH6', 'WH7'];

  statusNum = new FormControl();
  statusList: string[] = ['รอการเริ่มงาน', 'รอการจบงาน'];

  prodPack = new FormControl('คนงาน');
  prodPackList: string[] = ['fork lift', 'คนงาน'];

  worker1 = new FormControl();
  worker1List: string[] = ['นาย ก.', 'นาย ข.', 'นาย ค.', 'นาย ง.'];

  worker2 = new FormControl();
  worker2List: string[] = ['นาย ก.', 'นาย ข.', 'นาย ค.', 'นาย ง.'];

  //toggle from status
  public show: boolean = true;
  public show1: boolean = false;


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  datatoSearch() {
    console.log("click to search:"+ this.warehouseList.values);
  }

  TableData = [
    {
      shipmentType: "Z101", carLicense: "รย123", wareNum: "WH40", 
      containNum:"1", shipmentNum:"6XXX01", deliverNo: "3XXX11",
      grade: "1102K", qty: "10000", prodType:"คนงาน", 
      workern1:"นาย ก.", workern2:"นาย ข."

    },

    {
      shipmentType: "Z102", carLicense: "รย555", wareNum: "WH40", deliverNo: "3XXX11",
      containNum:"13", shipmentNum:"6XXX22", grade: "1102K", qty: "10000",
      prodType:"คนงาน", workern1:"นาย ค.", workern2:"นาย ง."
    }
  ];

  sendStart(i){
    console.log("send start loop"+i);
  }

  sendEnd(i){
    console.log("send end loop"+i);
  }

  //toggle from status
  selected(selectedVal){

    console.log(selectedVal);
    if(selectedVal=="รอการจบงาน"){
      console.log("fin loop")
      this.show = false;
      this.show1 = true;
    }

    else if(selectedVal=="รอการเริ่มงาน"){
      this.show1 = false;
      this.show = true;

    }


  }

}
