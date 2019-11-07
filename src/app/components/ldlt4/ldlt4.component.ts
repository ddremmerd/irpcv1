import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';


export interface searchwith {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-ldlt4',
  templateUrl: './ldlt4.component.html',
  styleUrls: ['./ldlt4.component.css']
})

export class Ldlt4Component implements OnInit {

  public sorting: string;

  searchkeyword = new FormControl();
  searchwithkey = new FormControl();



  content_header_name = "ทะเบียนตู้คอนเทนเนอร์ (Container Register) ฝั่งแผนกขนส่ง";

  content_header_name2 = "ตู้คอนเทนเนอร์ที่ไม่ถูกใช้งานใน .... วัน";

  TableHeader = ["No.", "วันที่เข้ารับสินค้า", "INVOICE NO.", "AGENT", "รับตู้ (PICK UP AT)", "คืนตู้ (RETURN TO)",
    "คืนตู้ (RETURN TO)", "CLOSING DATE", "CLOSING TIME", "ETD LCB", "วันที่รับตู้เปล่า", "CONTAINER NO.", "SEAL NO.",
    "น้ำหนักตู้เปล่า(VGM Tare)", "SIZE CONTAINER (“)", "วันที่คืนตู้หนัก", "REMARKS", "เวลาบันทึกล่าสุด"];

  TableData = [
    {
      date: "26/8/19", inv: "IRPC 3954-19", agent: "ONE", booking: "BKKVE0261800", pickup: "KRC", return: "C1C2",
      close_date: "11-8-19", close_time: "23.59", ETD: "14-8-19", empty_cont: "24/8/19", cont_num: "NYKU3768136", seal_num: "THAG57001",
      cont_weight: "2200", cont_size: "20", give_date: "", remark: "", latest_time: "14-8-19"
    },
    {
      date: "26/8/19", inv: "IRPC 3954-19", agent: "ONE", booking: "BKKVE0261800", pickup: "KRC", return: "C1C2",
      close_date: "11-8-19", close_time: "23.59", ETD: "14-8-19", empty_cont: "24/8/19", cont_num: "NYKU3768136", seal_num: "THAG57001",
      cont_weight: "2200", cont_size: "20", give_date: "", remark: "", latest_time: "14-8-19"
    },
    {
      date: "26/8/19", inv: "IRPC 3954-19", agent: "ONE", booking: "BKKVE0261800", pickup: "KRC", return: "C1C2",
      close_date: "11-8-19", close_time: "23.59", ETD: "14-8-19", empty_cont: "24/8/19", cont_num: "NYKU3768136", seal_num: "THAG57001",
      cont_weight: "2200", cont_size: "20", give_date: "", remark: "", latest_time: "14-8-19"
    }
  ];
  _object = Object;

  searchkey: searchwith[] = [
    { value: "All", viewValue: "All" },
    { value: "invoiceNo", viewValue: "Invoice No." },
    { value: "bookingNo", viewValue: "Booking No." },
    { value: "containerNo", viewValue: "Container No." },
    { value: "sealNo", viewValue: "Seal No." },
  ];

  constructor() { }

  ngOnInit() {

    

  }

  

  // dropdown(searchwithkey) {
  //   var search_key = searchwithkey;
  //   console.log("loppp ddl:" + search_key);
  //   return search_key;

  // }

  keyword(search_key) {
    var key = this.searchkeyword.value;
    var search_with = this.searchwithkey.value;
    console.log(search_with, key);

  }


}


