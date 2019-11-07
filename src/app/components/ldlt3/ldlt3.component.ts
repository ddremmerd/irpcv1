import { Component, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface TableDat {
  shipment_no: string;
  booking_no: string;
  invoice_no: string;
  planning_time: string;
  wareNum: string;
  shipment_type: string;
  ship_license: string;
  driver_check_time: string;
  queue_no: string;
}


@Component({
  selector: 'app-ldlt3',
  templateUrl: './ldlt3.component.html',
  styleUrls: ['./ldlt3.component.css'],
})

export class Ldlt3Component implements OnInit {




  content_header_name = "ระบบจัดการคิว (Queue Management)";

  ListHeader1 = "WH: ";

  wh_no: string;
  Droplist2: any;
  search: any;

  DropdownHeader1 = ["WH41", "WH42", "WH43"];


  warehouseNum = ["41", "42", "43"];

  TableHeader = ["No.", "Shipment No.", "Booking No.", "Invoice No.", "Planning Time", "WH", "ประเภทรถ", "ทะเบียนรถ", "Driver Checking Time", "ลำดับคิว", ""]
  TableData: TableDat[] = [

    {
      shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "INV-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง",
      ship_license: "70-1111รย", driver_check_time: "08:57", queue_no: "B001"
    },
    {
      shipment_no: "6000vvv11", booking_no: "BK-0542", invoice_no: "INV-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง",
      ship_license: "88-1254รย", driver_check_time: "09:01", queue_no: "A001"
    },
    {
      shipment_no: "6000vvv22", booking_no: "BK-0322", invoice_no: "INV-01112", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 10 ล้อพ่วง คอกสูง",
      ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A003"
    },
    {
      shipment_no: "6000vvv33", booking_no: "BK-1102", invoice_no: "INV-022772", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 16 ล้อเปิดข้าง",
      ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A005"
    },
  ];

  // _object = Object;

  sortedData: TableDat[];


  constructor() {
    this.sortedData = this.TableData.slice();
  }

  sortData(sort: Sort) {
    const data = this.TableData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'queue_no': return this.compare(a.queue_no, b.queue_no, isAsc);
        default: return 0;
      }
    });
  }

compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



  ngOnInit() {
  }



  selected(Droplist) {
    console.log(Droplist);
  }

    checkValue(item) {
    console.log(item);
  }

  getSelected(select){
    console.log(select)
  }

  recall(evt, i, booknum){
    console.log("from recall button"+i+booknum)
  }


}


