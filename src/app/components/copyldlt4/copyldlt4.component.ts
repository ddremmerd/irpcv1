import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelectChange, MatDatepickerInputEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import * as Type from 'src/models/VariablesType';
import * as moment from 'moment';
import { splitAtColon } from '@angular/compiler/src/util';

export interface searchwith {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-copyldlt4',
  templateUrl: './copyldlt4.component.html',
  styleUrls: ['./copyldlt4.component.css']
})



export class Copyldlt4Component implements OnInit {

  //---------------------get carrier
  GetCarrierName: Type.ResponseCarrier;
  //--------------------- get data api/v1/Process/ProcessSerachContainerReg
  GetResProcessSearchConReg: Type.ResponseProcessSearchContainerReg;

  //--------------------- get data api/v1/Process/ProcessSerachContainerRegNotAssign
  GetResProcessSearchConNotAssign: Type.ResponseProcessSearchContainerRegNotAssign


  searchkeyword = new FormControl();
  searchwithkey = new FormControl();

  carrierID = new FormControl();

  content_header_name = "ทะเบียนตู้คอนเทนเนอร์ (Container Register) ฝั่งแผนกขนส่ง ----COPY";
  content_header_name2 = "ตู้คอนเทนเนอร์ที่ไม่ถูกใช้งานใน .... วัน";


  TableHeader = ["No.", "วันที่เข้ารับสินค้า", "INVOICE NO.", "AGENT", "Bookig No.", "รับตู้ (PICK UP AT)", "คืนตู้ (RETURN TO)", "CLOSING DATE", "CLOSING TIME", "ETD LCB", "วันที่รับตู้เปล่า", "CONTAINER NO.", "SEAL NO.",
    "น้ำหนักตู้เปล่า(VGM Tare)", "SIZE CONTAINER (“)", "วันที่คืนตู้หนัก", "REMARKS", "เวลาบันทึกล่าสุด"];

  _object = Object;

  searchkey: searchwith[] = [
    { value: "All", viewValue: "All" },
    { value: "invoiceNo", viewValue: "Invoice No." },
    { value: "bookingNo", viewValue: "Booking No." },
    { value: "containerNo", viewValue: "Container No." },
    { value: "sealNo", viewValue: "Seal No." },
  ];

  //--------------------- matTable
  displayedColumns = ["nRow", "receive_Date", "invoiceNum", "agentNum", "bookingNum", "pickUpAt", "returnTo", "closingDate", "closingTime",
    "etd_lcb", "emptyConta", "containerNum", "sealNum", "vgmTare", "containerSize", "returnDate", "Remarks", "latestTime"];
  dataSource: MatTableDataSource<UserData>;

  displayedColumns2 = ["nRow", "receive_Date", "invoiceNum", "agentNum", "bookingNum", "pickUpAt", "returnTo", "closingDate", "closingTime",
    "etd_lcb", "emptyConta", "containerNum", "sealNum", "vgmTare", "containerSize", "returnDate", "Remarks", "latestTime"];
  dataSource2: MatTableDataSource<UserData2>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort; 


  //-------------api get carrier
  sim_carrier = {
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
      },
      {
        "carrierid": 3,
        "code": "1222222",
        "name": "บริษัท เคพีเอส จำกัด"
      },
      {
        "carrierid": 3,
        "code": "1222222",
        "name": "บริษัท เคพีเอส จำกัด"
      }
    ],
    "message": "OK"
  }

  // ---------api/v1/Process/ProcessSerachContainerReg
  sim_ResProSeaCarConReg = {
    "result": [
      {
        "containner_regis_id": 1,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3954-19",
        "booinkg_No_text": "BKKVE0261800",
        "container_No": "MOAU0532634",
        "seal_No": "THAG57002",
        "size_container": 20,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 2308,
        "closing_datetime": "2019-12-05T09:22:07.593",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 1,
        "pickup_at_code": "KRC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "is_Shipment_No_assigned": "6102160371 ",
        "loading_date": "2019-12-11T00:00:00",
        "last_update_datetime": "2020-01-10T02:19:44.587"
      },
      {
        "containner_regis_id": 2,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 5000,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 1,
        "pickup_at_code": "KRC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "is_Shipment_No_assigned": null,
        "loading_date": null,
        "last_update_datetime": "2020-01-10T02:07:33.683"
      },
      {
        "containner_regis_id": 3,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532635",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 3900,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "is_Shipment_No_assigned": null,
        "loading_date": null,
        "last_update_datetime": "2019-12-02T10:55:12.367"
      },
      {
        "containner_regis_id": 4,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 3900,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "is_Shipment_No_assigned": null,
        "loading_date": null,
        "last_update_datetime": "2019-12-02T10:55:19.853"
      },
      {
        "containner_regis_id": 5,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 0703/12",
        "booinkg_No_text": "M480019245",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 2500,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "is_Shipment_No_assigned": null,
        "loading_date": null,
        "last_update_datetime": "2019-12-02T11:03:06.63"
      }
    ],
    "message": "OK"
  }

  // ---------api/v1/Process/ProcessSerachContainerRegNotAssign?carrierId=1
  sim_ResProSeaCarConRegNotAss = {
    "result": [
      {
        "loading_date": null,
        "containner_regis_id": 2,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 5000,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "last_update_datetime": "2020-01-04T23:23:05.267",
        "is_Shipment_No_assigned": null
      },
      {
        "loading_date": null,
        "containner_regis_id": 3,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532635",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 3900,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "last_update_datetime": "2019-12-02T10:55:12.367",
        "is_Shipment_No_assigned": null
      },
      {
        "loading_date": null,
        "containner_regis_id": 4,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 3738-19",
        "booinkg_No_text": "GAT0151250",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 3900,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "last_update_datetime": "2019-12-02T10:55:19.853",
        "is_Shipment_No_assigned": null
      },
      {
        "loading_date": null,
        "containner_regis_id": 5,
        "carrier_id": 1,
        "carrier_code": "900069",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "recieve_date": "2019-12-02T00:00:00",
        "invoice_no_text": "IRPC 0703/12",
        "booinkg_No_text": "M480019245",
        "container_No": "MOAU0532636",
        "seal_No": "K6619828",
        "size_container": 40,
        "return_date": "2019-12-09T00:00:00",
        "vgM_Tare": 2500,
        "closing_datetime": "2019-12-11T10:00:00",
        "etd_lcb": "2019-12-07T00:00:00",
        "agent_container_id": 2,
        "agent_container_code": "APL",
        "agent_container_name": "Wait IRPC Filled",
        "pickup_at_id": 2,
        "pickup_at_code": "SCSC",
        "pickup_at_name": "Wait IRPC Filled",
        "pickup_return_id": 3,
        "pickup_return_code": "C1C2",
        "pickup_return_name": "Wait IRPC Filled",
        "last_update_datetime": "2019-12-02T11:03:06.63",
        "is_Shipment_No_assigned": null
      }
    ],
    "message": "OK"
  }



  //---------------array to display for AssignCon
  closing_time = [];
  RegCon_load_date_toShow = [];
  RegCon_close_date_toShow = [];
  RegCon_close_time_toShow = [];
  RegCon_receieveDate_toShow = [];
  RegCon_returnDate_toShow = [];
  RegCon_lastUpdate_date_toShow = [];
  RegCon_lastUpdate_time_toShow = [];
  RegCon_etd_date_toShow = [];

  //---------------array to display for NotAssignCon
  loading_date_NotAssign_toShow = [];
  closing_time_notAssign = [];
  closing_date_notAssign_toShow = [];
  closing_time_notAssign_toShow = [];
  notAss_receiveDate_toShow = [];
  notAss_returnDate_toShow = [];
  notAss_lastUpdate_date_toShow = [];
  notAss_lastUpdate_time_toShow = [];
  notAss_etd_date_toShow = [];


  constructor() { }


  ngOnInit() {

    this.GetCarrierName = this.sim_carrier as Type.ResponseCarrier;


  }


  SearchWithkeyword(search_key) {
    // var key = this.searchkeyword.value;
    var search_with = this.searchwithkey.value;
    let carID = this.carrierID.value; ///---------ใช้ carrierID ตรงนี้
    console.log(search_with);


    if (this.carrierID.value == null || search_with == null) {
      if (this.carrierID == null) {
        alert("กรุณาเลือกผู้ขนส่ง")
      }

      if (search_with == null) {
        alert("กรุณาเลือกการค้นหา")
      }

    }

    else {
      console.log("some not NULL")
    }

    if (this.carrierID.value != null && search_with != null) {
      if (search_with == "All") {
        let parameterforSearch = "";
        console.log("search with all")
        //-----api/v1/Process/ProcessSerachContainerReg?carrierId=1&parameter=

      }
      else {
        let parameterforSearch = this.searchkeyword.value;
        console.log("search with key", parameterforSearch);
        //------api/v1/Process/ProcessSerachContainerReg?carrierId=1&parameter=BKKVE0261800
      }

      this.GetResProcessSearchConReg = this.sim_ResProSeaCarConReg as Type.ResponseProcessSearchContainerReg;
      this.GetResProcessSearchConNotAssign = this.sim_ResProSeaCarConRegNotAss as Type.ResponseProcessSearchContainerRegNotAssign;


      if (this.GetResProcessSearchConReg.message == "OK" && this.GetResProcessSearchConNotAssign.message == 'OK') {
        if (this.GetResProcessSearchConReg.result.length > 0 && this.GetResProcessSearchConNotAssign.result.length > 0) {
          let closing_time, RegCon_close_date_toShow, RegCon_close_time_toShow, RegCon_receieveDate_toShow,
            RegCon_returnDate_toShow, RegCon_lastUpdate_date_toShow, RegCon_lastUpdate_time_toShow, RegCon_etd_date_toShow = new Array(this.GetResProcessSearchConReg.result.length);

          let closing_time_notAssign, closing_date_notAssign_toShow, closing_time_notAssign_toShow, notAss_receiveDate_toShow,
            notAss_returnDate_toShow, notAss_lastUpdate_date_toShow, notAss_etd_date_toShow = new Array(this.GetResProcessSearchConNotAssign.result.length);

          // console.log(this.closing_time)
          this.getResponseTable()
        }
      }
    }






  }


  getResponseTable() {

    //------------------------- table of assignCon
    if (this.GetResProcessSearchConReg != null) {
      if (this.GetResProcessSearchConReg.message == "OK") {
        if (this.GetResProcessSearchConReg.result.length > 1) {
          const users: UserData[] = [];
          for (let i = 0; i < this.GetResProcessSearchConReg.result.length; i++) {

            users.push(createNewRow(i, this.GetResProcessSearchConReg.result[i]));

            this.closing_time[i] = this.GetResProcessSearchConReg.result[i].closing_datetime;

            let loading = this.GetResProcessSearchConReg.result[i].loading_date;
            if (loading != null) {
              let loading1 = loading.toString().split("T");
              this.RegCon_load_date_toShow[i] = loading1[0];

            }
            else {
              this.RegCon_load_date_toShow[i] = null;

            }
            let closing = this.GetResProcessSearchConReg.result[i].closing_datetime;
            if (closing != null) {
              let closing1 = closing.toString().split("T");
              this.RegCon_close_date_toShow[i] = closing1[0];
              this.RegCon_close_time_toShow[i] = closing1[1];
            }
            else {
              this.RegCon_close_date_toShow[i] = null;
              this.RegCon_close_time_toShow[i] = null;
            }

            let receive = this.GetResProcessSearchConReg.result[i].recieve_date;
            if (receive != null) {
              let receive1 = receive.toString().split("T");
              this.RegCon_receieveDate_toShow[i] = receive1[0];
            }
            else {
              this.RegCon_receieveDate_toShow = null;
            }

            let etd = this.GetResProcessSearchConReg.result[i].etd_lcb;
            if (etd != null) {
              let etd1 = etd.toString().split("T");
              this.RegCon_etd_date_toShow[i] = etd1[0];
            }
            else {
              this.RegCon_etd_date_toShow[i] = null;
            }


            let return1 = this.GetResProcessSearchConReg.result[i].return_date;
            if (return1 != null) {
              let return11 = return1.toString().split("T");
              this.RegCon_returnDate_toShow[i] = return11[0];
            }
            else {
              this.RegCon_returnDate_toShow[i] = null;
            }

            let last = this.GetResProcessSearchConReg.result[i].last_update_datetime;
            if (last != null) {
              let last1 = last.toString().split("T");
              this.RegCon_lastUpdate_date_toShow[i] = last1[0];
              this.RegCon_lastUpdate_time_toShow[i] = last1[1];
            }
            else {
              this.RegCon_lastUpdate_date_toShow[i] = null;
              this.RegCon_lastUpdate_time_toShow[i] = null;
            }

          }

          this.dataSource = new MatTableDataSource(users);
        }

      }


    }

    //------------------------- table of NotAssignCon
    if (this.GetResProcessSearchConNotAssign != null) {
      if (this.GetResProcessSearchConNotAssign.message == "OK") {
        if (this.GetResProcessSearchConNotAssign.result.length > 1) {
          const users1: UserData2[] = [];
          
          for (let i = 0; i < this.GetResProcessSearchConNotAssign.result.length; i++) {
            this.closing_time_notAssign[i] = this.GetResProcessSearchConNotAssign.result[i].closing_datetime;
            users1.push(createNewRow2(i, this.GetResProcessSearchConNotAssign.result[i]));

            let loadDate = this.GetResProcessSearchConNotAssign.result[i].loading_date;
            if (loadDate != null) {
              let loadDate1 = loadDate.toString().split("T");
              this.loading_date_NotAssign_toShow[i] = loadDate1[0];
            }
            else {
              this.loading_date_NotAssign_toShow[i] = null;
            }
            let receiveDate = this.GetResProcessSearchConNotAssign.result[i].recieve_date;
            if (receiveDate != null) {
              let receiveDate1 = receiveDate.toString().split("T");
              this.notAss_receiveDate_toShow[i] = receiveDate1[0];
            }
            else {
              this.notAss_receiveDate_toShow[i] = null;

            }

            let returnDate = this.GetResProcessSearchConNotAssign.result[i].return_date;
            if (returnDate != null) {
              let returnDate1 = returnDate.toString().split("T");
              this.notAss_returnDate_toShow[i] = returnDate1[0];
            }
            else {
              this.notAss_returnDate_toShow[i] = null;
            }



            let clos_dat_not = this.closing_time_notAssign[i];
            if (clos_dat_not != null) {
              let clos_dat_not1 = clos_dat_not.toString().split("T");
              this.closing_date_notAssign_toShow[i] = clos_dat_not1[0];
              this.closing_time_notAssign_toShow[i] = clos_dat_not1[1];
            }
            else {
              this.closing_date_notAssign_toShow[i] = null;
              this.closing_time_notAssign_toShow[i] = null;
            }

            let etd = this.GetResProcessSearchConNotAssign.result[i].etd_lcb;
            if (etd != null) {
              let etd1 = etd.toString().split("T");
              this.notAss_etd_date_toShow[i] = etd1[0];
            }
            else {
              this.notAss_etd_date_toShow[i] = null;

            }


            let last_update = this.GetResProcessSearchConNotAssign.result[i].last_update_datetime;
            if (last_update != null) {
              let last_update1 = last_update.toString().split("T");
              this.notAss_lastUpdate_date_toShow[i] = last_update1[0];
              this.notAss_lastUpdate_time_toShow[i] = last_update1[1];
            }
            else {
              this.notAss_lastUpdate_date_toShow[i] = null;
              this.notAss_lastUpdate_time_toShow[i] = null;
            }

          }

          this.dataSource2 = new MatTableDataSource(users1);
          console.log("====================NOT ASSIGN", this.dataSource2)


        }
      }
    }


  }

}


function createNewRow(j: number, data): UserData {
  let loadingShow, closing_date, closing_time, returnShow, etdShow, receDate, updateShow;
  if (data.loading_date != null) {

    let recieve1 = data.loading_date.split("T");
    let receivetime = recieve1[1].split(":");
    loadingShow = moment(data.loading_date).format("DD/MM/YYYY") + "\n" + receivetime[0] + ":" + receivetime[1];
  } else {
    loadingShow = "";
  }

  if (data.closing_datetime != null) {
    let close = data.closing_datetime.split("T");
    let closetime = close[1].split(":");
    closing_date = close[0];
    closing_time = closetime[0] + ":" + closetime[1];
  }
  else {
    closing_date = "";
    closing_time = "";
  }

  if (data.return_date != null) {

    let rett = data.return_date.split("T");
    let rettTime = rett[1].split(":")
    returnShow = rett[0];
  } else {
    returnShow = "";
  }

  if (data.etd_lcb != null) {
    let etdd = data.etd_lcb.split("T");
    let etdd1 = etdd[1].split(":");
    etdShow = etdd[0] + "\n" + etdd1[0] + ":" + etdd1[1];

  } else {
    etdShow = "";

  }

  if (data.recieve_date != null) {
    let rec = data.recieve_date.split("T");
    let rec11 = rec[1].split(":");
    receDate = rec[0] + "\n" + rec11[0] + ":" + rec11[1];
  } else {
    receDate = "";
  }

  if (data.last_update_datetime != null) {
    let upd = data.last_update_datetime.split("T");
    let upd11 = upd[1].split(":");
    updateShow = upd[0] + "\n" + upd11[0] + ":" + upd11[1];

  } else {
    updateShow = "";
  }


  return {

    nRow: j + 1,

    receive_Date: loadingShow,
    invoiceNum: data.invoice_no_text,
    agentNum: data.agent_container_code,
    bookingNum: data.booinkg_No_text,
    pickUpAt: data.pickup_at_name,
    returnTo: data.pickup_return_code,
    closingDate: closing_date,
    closingTime: closing_time,
    etd_lcb: etdShow,
    emptyConta: receDate,
    containerNum: data.container_No,
    sealNum: data.seal_No,
    vgmTare: data.vgM_Tare,
    containerSize: data.size_container,
    returnDate: returnShow,
    Remarks: "-",
    latestTime: updateShow,

  };
}

function createNewRow2(j: number, data): UserData2 {

  console.log("_________________CREATE NEW ROW2:", data)
  let loadingShow, closing_date, closing_time, returnShow, etdShow, receDate, updateShow;
  if (data.loading_date != null) {

    let recieve1 = data.loading_date.split("T");
    let receivetime = recieve1[1].split(":");
    loadingShow = moment(data.loading_date).format("DD/MM/YYYY") + "\n" + receivetime[0] + ":" + receivetime[1];
  } else {
    loadingShow = "";
  }

  if (data.closing_datetime != null) {
    let close = data.closing_datetime.split("T");
    let closetime = close[1].split(":");
    closing_date = close[0];
    closing_time = closetime[0] + ":" + closetime[1];
  }
  else {
    closing_date = "";
    closing_time = "";
  }

  if (data.return_date != null) {

    let rett = data.return_date.split("T");
    let rettTime = rett[1].split(":")
    returnShow = rett[0];
  } else {
    returnShow = "";
  }

  if (data.etd_lcb != null) {
    let etdd = data.etd_lcb.split("T");
    let etdd1 = etdd[1].split(":");
    etdShow = etdd[0] + "\n" + etdd1[0] + ":" + etdd1[1];

  } else {
    etdShow = "";

  }

  if (data.recieve_date != null) {
    let rec = data.recieve_date.split("T");
    let rec11 = rec[1].split(":");
    receDate = rec[0] + "\n" + rec11[0] + ":" + rec11[1];
  } else {
    receDate = "";
  }

  if (data.last_update_datetime != null) {
    let upd = data.last_update_datetime.split("T");
    let upd11 = upd[1].split(":");
    updateShow = upd[0] + "\n" + upd11[0] + ":" + upd11[1];

  } else {
    updateShow = "";
  }


  return {

    nRow: j + 1,
    receive_Date: loadingShow,
    invoiceNum: data.invoice_no_text,
    agentNum: data.agent_container_code,
    bookingNum: data.booinkg_No_text,
    pickUpAt: data.pickup_at_name,
    returnTo: data.pickup_return_code,
    closingDate: closing_date,
    closingTime: closing_time,
    etd_lcb: etdShow,
    emptyConta: receDate,
    containerNum: data.container_No,
    sealNum: data.seal_No,
    vgmTare: data.vgM_Tare,
    containerSize: data.size_container,
    returnDate: returnShow,
    Remarks: "-",
    latestTime: updateShow,

  };
}

export interface UserData {
  nRow: number
  receive_Date: any
  invoiceNum: string
  agentNum: string
  bookingNum: string
  pickUpAt: string
  returnTo: string
  closingDate: string
  closingTime: string
  etd_lcb: string
  emptyConta: string
  containerNum: string
  sealNum: string
  vgmTare: string
  containerSize: string
  returnDate: string
  Remarks: string
  latestTime: string

}

export interface UserData2 {
  nRow: number
  receive_Date: any
  invoiceNum: string
  agentNum: string
  bookingNum: string
  pickUpAt: string
  returnTo: string
  closingDate: string
  closingTime: string
  etd_lcb: string
  emptyConta: string
  containerNum: string
  sealNum: string
  vgmTare: string
  containerSize: string
  returnDate: string
  Remarks: string
  latestTime: string

}
