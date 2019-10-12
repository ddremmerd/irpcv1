import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ldlt1',
  templateUrl: './ldlt1.component.html',
  styleUrls: ['./ldlt1.component.css']
})
export class Ldlt1Component implements OnInit {

  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information";


  ListHeader1 = "ประเภทงาน: ";
  ListHeader2 = "ผู้ขนส่ง: ";
  ListHeader3 = "สถานะ: ";
  

  shipment_Type = ["Local", "Export"];
  transportor_Name = ["ตะวันรุ่ง ทรานส์", "KEERY xpress", "TRUCK 999"];
  shipment_Status = ["รอแผนกขนส่งลง Planning", "รอผู้ขนส่ง confirm"];

  TableHeader = ["", "No.", "Shipment No.", "DO No.", "Remarks", "WH", "ประเภทรถ", "Shipment (หาง)", "Planning Time", "", "",""];

  TableData = [
    {check: true, number:"1", shipmentNum: "6asfdasf", 
    DONum: "DO-87897", Remark: true, wh_no: 41, 
    shimentType: true, shipmentTail: true, planningTime: "11.44"},

    {check: true, number:"2", shipmentNum: "99SDAFFSAD", 
    DONum: "DO-1111", Remark: true, wh_no: 41, 
    shimentType: true, shipmentTail: true, planningTime: "12.44"}
  ];
  _object = Object;
  
  constructor() { }

  ngOnInit() {

    console.log(this._object);
  }

  selected(Droplist){
    console.log(Droplist);
  }

}
