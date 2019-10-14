import { Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-ldlt3',
  templateUrl: './ldlt3.component.html',
  styleUrls: ['./ldlt3.component.css'],
})

export class Ldlt3Component implements OnInit {

  


  content_header_name = "ระบบจัดการคิว (Queue Management)";
  
  ListHeader1 ="WH: ";

  wh_no: string;

  DropdownHeader1 = ["WH41", "WH42", "WH43"];
  

  DropdownHeader2 = [41, 42, 43];

  TableHeader = ["No.", "Shipment No.", "Booking No.", "Invoice No.", "Planning Time", "WH", "ประเภทรถ", "ทะเบียนรถ", "Driver Checking Time", "ลำดับคิว", ""]

  // TableData = [

  //   {number: 1, shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "BK-0002", planning_time: "09:00", wh_no: 41, shipment_type: "รถ 10 ล้อเปิดข้าง", 
  //   ship_license:"70-1111รย", driver_check_time: "08:57", queue_no: "B001"},
  //   {number: 2, shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "BK-0002", planning_time: "09:00", wh_no: 41, shipment_type: "รถ 10 ล้อเปิดข้าง", 
  //   ship_license:"88-1254รย", driver_check_time: "09:01", queue_no: "A001"},
  //   {number: 3, shipment_no: "6000vvv22", booking_no: "BK-0002", invoice_no: "BK-01112", planning_time: "09:00", wh_no: 42, shipment_type: "รถ 10 ล้อพ่วง คอกสูง", 
  //   ship_license:"75-1254รย", driver_check_time: "09:01", queue_no: "A003"},
  //   {number: 4, shipment_no: "6000vvv33", booking_no: "BK-0002", invoice_no: "BK-022772", planning_time: "09:00", wh_no: 42, shipment_type: "รถ 16 ล้อเปิดข้าง", 
  //   ship_license:"75-1254รย", driver_check_time: "09:01", queue_no: "A005"},
  // ];

  TableData: any[] = [

    {number: 1, shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "BK-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง", 
    ship_license:"70-1111รย", driver_check_time: "08:57", queue_no: "B001"},
    {number: 2, shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "BK-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง", 
    ship_license:"88-1254รย", driver_check_time: "09:01", queue_no: "A001"},
    {number: 3, shipment_no: "6000vvv22", booking_no: "BK-0002", invoice_no: "BK-01112", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 10 ล้อพ่วง คอกสูง", 
    ship_license:"75-1254รย", driver_check_time: "09:01", queue_no: "A003"},
    {number: 4, shipment_no: "6000vvv33", booking_no: "BK-0002", invoice_no: "BK-022772", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 16 ล้อเปิดข้าง", 
    ship_license:"75-1254รย", driver_check_time: "09:01", queue_no: "A005"},
  ];

  _object = Object;

  constructor() { }

  ngOnInit() {
  }

  checkValue(item){
    console.log(item);
  }

  selected(Droplist){
    console.log(Droplist);
  }

  

}


