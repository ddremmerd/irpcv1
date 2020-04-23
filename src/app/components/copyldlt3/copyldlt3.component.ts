import { Component, OnInit, ElementRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName } from '@angular/forms';
import * as Type from 'src/models/VariablesType';
import * as moment from 'moment';


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
  selector: 'app-copyldlt3',
  templateUrl: './copyldlt3.component.html',
  styleUrls: ['./copyldlt3.component.css']
})
export class Copyldlt3Component implements OnInit {

  getStorage: Type.ResponseCbStorage;

  //------------------ get data to display api/v1/Process/ProcessGetQueueList
  getTable: Type.ResponseProcessGetQueueList;

  //-------------ddl WH
  wareHouse = new FormControl();
  warehouse_list: Array<string>;

  content_header_name = "ระบบจัดการคิว (Queue Management)----------COPY";

  sim_storage = {
    "result": [
      {
        "storageid": 1,
        "storage_code": "36",
        "storage_name": "WH36"
      },
      {
        "storageid": 2,
        "storage_code": "3643",
        "storage_name": "WH36 & WH43"
      }
    ],
    "message": "OK"
  }


  displayedColumns = ["nRow", "ShipNum", "BookingNum", "InvoiceNum", "PlanTime", "WareHouse", "CarType", "CarLicense", "DriverCheckTime", "queueNum", "recallAgain"];
  dataSource: MatTableDataSource<UserData>;

  constructor() {
  }

  ngOnInit() {

    this.getStorage = this.sim_storage as Type.ResponseCbStorage;
    // this.dataSource1.sort = this.sort;
    this.createWHDropdown();
    // console.log("datasource", this.dataSource1)
  }


  createWHDropdown() {
    if (this.getStorage != undefined) {
      if (this.getStorage.message == "OK") {
        let list_ary = [];
        for (let l = 0; l < this.getStorage.result.length; l++) {
          list_ary[l] = this.getStorage.result[l].storage_name;
        }
        this.warehouse_list = list_ary;
      }
      else {
        console.log("message NOT OK");
      }
    }
    console.log(this.warehouse_list)

  }


  sel_wareHouseID: string;
  getResQueList = new Array();

  getQuelist() {

    let selected_wareHouseID;

    if (this.wareHouse.value == null) {
      alert("กรุณาเลือก WH");
    }
    else {
      console.log(this.wareHouse.value)
      for (let i = 0; i < this.getStorage.result.length; i++) {
        if (this.wareHouse.value == this.getStorage.result[i].storage_name) {
          selected_wareHouseID = this.getStorage.result[i].storageid;
        }
      }
      this.sel_wareHouseID = selected_wareHouseID;
      //-----------------api/v1/Process/ProcessGetQueueList?storagelist=7|55
      // console.log("warehouse id:", this.sel_wareHouseID);
      this.getResponseQueListTable()
    }
  }

  sim_resGetQueList = new Array();

  getResponseQueListTable() {

    let sim_resGetQueList = {
      "result": [
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T11:42:52.787",
          "storage": "WH40",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T20:07:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T23:42:52.787",
          "storage": "WH444444",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T11:55:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T04:42:52.787",
          "storage": "WH55555555",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T22:03:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T09:42:52.787",
          "storage": "WH6666666",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T15:54:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T00:42:52.787",
          "storage": "WH999999",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T20:07:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T00:42:52.787",
          "storage": "WH40",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T20:07:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T00:42:52.787",
          "storage": "WH40",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T20:07:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        },
        {
          "shipment_no": "6102160371",
          "booinkg_No": "M480019245",
          "invoice_No": "IRPC 0703/12",
          "plannig_Datetime": "2019-12-25T00:42:52.787",
          "storage": "WH40",
          "vehicle_group_Desc": null,
          "driver_Checkin_Datetime": "2020-01-04T20:07:31.537",
          "driver_text": null,
          "vehicle_plate": null,
          "queue_number": "C001"
        }
      ],
      "message": "OK"
    }

    this.getTable = sim_resGetQueList as Type.ResponseProcessGetQueueList;
    if (this.getTable != null) {
      const users: UserData[] = [];
      if (this.getTable.message == 'OK') {
        if (this.getTable.result.length > 0) {
          for (let j = 0; j < this.getTable.result.length; j++) {
            users.push(createNewRow(j, this.getTable.result[j]));

          }


          this.dataSource = new MatTableDataSource(users);

        }
      }
    }

  }


  toRecall(row) {
    console.log("=====recall", row)
  }

}

function createNewRow(j: number, data): UserData {

  let dt = data.plannig_Datetime.split("T");
  let tt = dt[1].split(":");

  let dt1 = data.driver_Checkin_Datetime.split("T");
  let tt1 = dt1[1].split(":");

  return {
    nRow: j + 1,
    ShipNum: data.shipment_no,
    BookingNum: data.booinkg_No,
    InvoiceNum: data.invoice_No,
    PlanTime: moment(data.closing_datetime).format("DD/MM/YYYY") + "\n" + tt[0] + ":" + tt[1],
    WareHouse: data.storage,
    CarType: data.vehicle_group_Desc,
    CarLicense: data.vehicle_plate,
    DriverCheckTime: moment(data.driver_Checkin_Datetime).format("DD/MM/YYYY") + "\n" + tt1[0] + ":" + tt1[1],
    queueNum: data.queue_number,
    recallAgain: "-"
  };
}

export interface UserData {
  nRow: number
  ShipNum: string
  BookingNum: string
  InvoiceNum: string
  PlanTime: string
  WareHouse: string
  CarType: string
  CarLicense: string
  DriverCheckTime: string
  queueNum: string
  recallAgain: any
}
