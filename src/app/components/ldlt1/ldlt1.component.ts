import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

export interface prodPacker {
  value: string;
  viewValue: string;
}

export interface addTool {
  value: string;
  viewValue: string;
}

export interface cartype {
  value: string;
  viewValue: string;
}

export interface shipTail {
  value: string;
}




@Component({
  selector: 'app-ldlt1',
  templateUrl: './ldlt1.component.html',
  styleUrls: ['./ldlt1.component.css']
})



export class Ldlt1Component implements OnInit {

  public show: boolean = false;
  public show1: boolean = false;
  public remark: boolean = false;
  public disableShip: boolean = true;
  public car: string;
  bt_save: Array<boolean> = [false];
  public route_save: boolean = true;
  events: string[] = [];
  public shipdiv:boolean = false;
  public shipdiv1:boolean = true;

  currentValueMap = {}


  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information (Sum ของยอดรถรวมที่ผู้ขนส่งแจ้ง - Quota ที่ขนส่งให้):";


  ListHeader1 = "ประเภทงาน: ";
  ListHeader2 = "ผู้ขนส่ง: ";
  ListHeader3 = "สถานะ: ";


  shipment_Type = ["Domestic", "Export"];
  transportor_Name = ["ตะวันรุ่ง ทรานส์", "KEERY xpress", "TRUCK 999"];
  shipment_Status = ["รอแผนกขนส่งลง Planning", "รอผู้ขนส่ง confirm"];

  TableHeader = ["No.", "Shipment No.", "Delivery No.", "Invoice No.", "Boking No.", "Closing Time", "Grade", "Qty (Kg)", "Truck Load", "ประเภทรถ", "Shipment (หาง)", "รถตีด่วน", "ต้องการอุปกรณ์", "คนบรรจุสินค้า", "Remark", "Picking At", "Return To", "Route", "รับของข้างนอก", "จำนวนกรรมกรลงสินค้า", "Planning Time", "", ""];

  TableData = [
    {
      shipmentNum: "6asfdasf", deliveryNum: "DO-87897", invoiceNum: "IRPC-0909",
      BookingNum: "BB-023113", closingTime: "09:10", grade:"A", quantity: 60, truckLoad: 90,
      shipmentType: "รถสิบล้อ", shipmentTail: "ipasdfp", urgentCar: "no", 
      additionalTool: "on Pallet", packer: "folk-lift", remark: "KOPPER", 
      pickupAt: "Suratthani", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "11.44"
    },

    {
      shipmentNum: "99SDAFFSAD", deliveryNum: "DO-1111", invoiceNum: "IRPC-11111",
      BookingNum: "BB-32467", closingTime: "09:10", grade:"A", quantity: 40, truckLoad: 50,
      shipmentType: "รถพ่วง", shipmentTail: "qqqqqqqqq", urgentCar: "no", 
      additionalTool: "None", packer: "Bulk", remark: "KDLLAO", 
      pickupAt: "CNX", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "12.44"
    },

    
    {
      shipmentNum: "sdfaff324234", deliveryNum: "DO-1971", invoiceNum: "IRPC-11111",
      BookingNum: "BB-32467", closingTime: "09:10", grade:"A", quantity: 40, truckLoad: 50,
      shipmentType: "รถสิบล้อ พ่วงข้าง", shipmentTail: "qqqqqqqqq", urgentCar: "no", 
      additionalTool: "None", packer: "Bulk", remark: "KDLLAO", 
      pickupAt: "CNX", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "12.44"
    },
  ];


  cartype: cartype[] = [
    { value: "รถพ่วง", viewValue: "รถพ่วง" },
    { value: "รถสิบล้อ", viewValue: "รถสิบล้อ" }
  ];


  productPacker: prodPacker[] = [
    { value: "default", viewValue: "ใช้คนงาน" },
    { value: "fork lift", viewValue: "ใช้ Forklift" },
    { value: "sea bulk", viewValue: "Sea Bulk" },
    { value: "bulk truck", viewValue: "Bulk Truck" }
  ];

  additionalTool: addTool[] = [
    { value: "no", viewValue: "-" },
    { value: "jumbo", viewValue: "Jumbo" },
    { value: "On pallet", viewValue: "On Pallet(เฉพาะรายตู้)" }
  ];

  shiptail: shipTail[] = [
    { value: "IRE0012" },
    { value: "IRE0982" },
  ]



  _object = Object;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit() {

    // console.log(this._object);
  }

  selected(Droplist) {
    console.log(Droplist);
    if (Droplist == "รอผู้ขนส่ง confirm") {
      console.log("กดรอ confirm จ้า");
      // this.show = !this.show;
      // this.show1 = false;

      this.show1 = !this.show1;
      this.show = false;   

      this.shipdiv1 = false;
      this.shipdiv = true;

    }

    if (Droplist == "รอแผนกขนส่งลง Planning") {
      // this.show1 = !this.show1;
      // this.show = false;

      this.show = !this.show;
      this.show1 = false;

      this.shipdiv1 = true;
      this.shipdiv = false;
    }
  }

  print(this) {
    console.log(this.value);
  }

  filterTab(this) {

    console.log("click to filter");

  }

  toggleRemark(i) {
    this.remark = !this.remark;
    console.log("toggle Remark" + i);

  }

  disableDropdown(value, i) {

    var num = i;

    console.log(value, i);
    // console.log(this);
    if (value != "รถพ่วง") {

      this.bt_save[num] = false;

    }
    else {
      this.bt_save[num] = true;

    }

    if (value == "Domestic") {
      this.route_save = false;
    }

    if (value == "Export") {
      this.route_save = true;
      console.log("load form tBConfig");
    }
    console.log("domestic loop");

  }


  Shiptail(value) {

    console.log("shiptail ddl: " + value);


  }

  inputEvent(event) {

    // this.dateFrom.date = event;
    // this.getData(this.dateFrom.date);
    console.log(event.value);
  }

  // inputEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  //   // console.log(events);

  // }

  deleteRow(j) {
    console.log("delete:" + j);
    this.TableData.splice(j, 1);

  }

  datatoSearch(ship) {
    console.log("send data to serch for table" + ship);
  }

  searchTable(event){

    console.log("searchTable llop"+ event)

  }



}
