import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor1',
  templateUrl: './vendor1.component.html',
  styleUrls: ['./vendor1.component.css']
})
export class Vendor1Component {
  content_header_name = "ส่งยอดจำนวนรถบรรทุก ณ ปัจจุบัน (Truck Amount Notification)";
  card_header_name1="ตารางแสดงรายละเอียดหมายเลขและประเภทรถ";
  card_header_name2="รายละเอียดจำนวนรถบรรทุกในแต่ละรอบ";

  TableData1 = [
    { type: 11, name: "รถ 6 ล้อคอก"},
    { type: 12, name: "รถ 6 ล้อ ตู้เปิดข้าง"},
    { type: 13, name: "รถ 10 ล้อ คอกสูง"},
    { type: 14, name: "รถ 10 ล้อ ตู้ผ้าใบ"},
    { type: 15, name: "รถ 6 ล้อคอก"},
    { type: 16, name: "รถ 6 ล้อ ตู้เปิดข้าง"},
    { type: 17, name: "รถ 10 ล้อ คอกสูง"},
    { type: 18, name: "รถ 10 ล้อ ตู้ผ้าใบ"},
  ];

  data1Length: any =this.TableData1.length/4;
  n_row1= parseInt(this.data1Length);
  

  

  TableHeader2 = ["No.", "รอบเวลา", "11", "12", "13", "14", "เวลาล่าสุด", ""];
  TableData2 = [
    { id: 1, time: "07:00-09:00", T11: true, T12: false, T13: true, T14: false, LastTime:"08.00" },
    { id: 2, time: "09:00-10:00", T11: false, T12: true, T13: true, T14: false, LastTime:"11.00" },
    { id: 3, time: "10:00-11.00", T11: true, T12: true, T13: true, T14: false, LastTime:"12.00" },
  ];
  _object = Object;
  constructor() { }

  ngOnInit() {
    
    // console.log("table data head"+ this.nColumn2);
  }

}
