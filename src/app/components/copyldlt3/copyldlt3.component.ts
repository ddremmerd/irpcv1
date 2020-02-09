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

  ListHeader1 = "WH: ";

  wh_no: string;
  Droplist2: any;
  search: any;

  DropdownHeader1 = ["WH41", "WH42", "WH43"];


  warehouseNum = ["41", "42", "43"];

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

  // displayedColumns1: string[] = ['shipment_no', 'booinkg_No', 'invoice_No', 'plannig_Datetime', 'storage',
  //   'vehicle_group_Desc', 'driver_Checkin_Datetime', 'driver_text', 'vehicle_plate', 'queue_number'];

  // dataSource1 = new MatTableDataSource(this.sim_resGetQueList.result);
  // id: any;

  displayedColumns = ["nRow", "ShipNum", "BookingNum", "InvoiceNum", "PlanTime", "WareHouse", "CarType", "CarLicense", "DriverCheckTime","queueNum","recallAgain"];
  dataSource: MatTableDataSource<UserData>;


  // TableHeader = ["No.", "Shipment No.", "Booking No.", "Invoice No.", "Planning Time", "WH", "ประเภทรถ", "ทะเบียนรถ", "Driver Checking Time", "ลำดับคิว", ""]
  // TableData: TableDat[] = [

  //   {
  //     shipment_no: "6000vvv11", booking_no: "BK-0002", invoice_no: "INV-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง",
  //     ship_license: "70-1111รย", driver_check_time: "08:57", queue_no: "B001"
  //   },
  //   {
  //     shipment_no: "6000vvv11", booking_no: "BK-0542", invoice_no: "INV-0002", planning_time: "09:00", wareNum: "41", shipment_type: "รถ 10 ล้อเปิดข้าง",
  //     ship_license: "88-1254รย", driver_check_time: "09:01", queue_no: "A001"
  //   },
  //   {
  //     shipment_no: "6000vvv22", booking_no: "BK-0322", invoice_no: "INV-01112", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 10 ล้อพ่วง คอกสูง",
  //     ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A003"
  //   },
  //   {
  //     shipment_no: "6000vvv33", booking_no: "BK-1102", invoice_no: "INV-022772", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 16 ล้อเปิดข้าง",
  //     ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A005"
  //   },
  //   {
  //     shipment_no: "6000vvv33", booking_no: "BK-1102", invoice_no: "INV-022772", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 16 ล้อเปิดข้าง",
  //     ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A005"
  //   },
  //   {
  //     shipment_no: "6000vvv33", booking_no: "BK-1102", invoice_no: "INV-022772", planning_time: "09:00", wareNum: "42", shipment_type: "รถ 16 ล้อเปิดข้าง",
  //     ship_license: "75-1254รย", driver_check_time: "09:01", queue_no: "A005"
  //   }
  // ];

  // _object = Object;

  // sortedData: TableDat[];
  // dataSource: MatTableDataSource<TableDat>;

  //---------------------- arrayto display 
  planningTime_toShow = [];
  planningDate_toShow = [];
  DriverTime_toShow = [];
  DriverDate_toShow = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
    // this.sortedData = this.TableData.slice();
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
    // console.log(this.getResQueList)



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
            // console.log("====================GET TABLE",j,this.getTable.result[j])

            // users.push(createNewRow(j, this.getTable.result[j]));

            let planning = this.getTable.result[j].plannig_Datetime;
            if (planning != null) {
              let planning1 = planning.toString().split("T");
              this.planningDate_toShow[j] = planning1[0];
              this.planningTime_toShow[j] = planning1[1];

            }
            else {
              this.planningDate_toShow[j] = null;
              this.planningTime_toShow[j] = null;

            }
            let driverCheck = this.getTable.result[j].driver_Checkin_Datetime;
            if (driverCheck != null) {
              let driverCheck1 = driverCheck.toString().split("T");
              this.DriverDate_toShow[j] = driverCheck1[0];
              this.DriverTime_toShow[j] = driverCheck1[1];
            }
            else {
              this.DriverDate_toShow[j] = null;
              this.DriverTime_toShow[j] = null;
            }
            users.push(createNewRow(j, this.getTable.result[j]));


          }
          

          this.dataSource = new MatTableDataSource(users);
          this.dataSource.paginator = this.paginator;

          // console.log("+++++++++++++++++++DATA SOURCE", this.dataSource)
        }
      }
    }

  }



  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }



  // sortData(sort: Sort) {
  //   const data = this.TableData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'queue_no': return this.compare(a.queue_no, b.queue_no, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  // compare(a: number | string, b: number | string, isAsc: boolean) {
  //   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  // }


  

  toRecall(row) {
    console.log("=====recall",row)
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }



}

function createNewRow(j: number, data): UserData {

  let dt = data.plannig_Datetime.split("T");
  let tt = dt[1].split(":");

  let dt1 = data.driver_Checkin_Datetime.split("T");
  let tt1 = dt1[1].split(":");
  // console.log("***********CREATE NEW ROW",j,tt)

  // console.log("***********CREATE NEW ROW",j, data.plannig_Datetime)

  return {
    nRow: j + 1,
    ShipNum: data.shipment_no,
    BookingNum: data.booinkg_No,
    InvoiceNum: data.invoice_No,
    PlanTime: moment(data.closing_datetime).format("DD/MM/YYYY")+"\n"+tt[0]+":"+tt[1],
    // PlanTime: this.planningDate_toShow[j] +"<br>"+ this.planningTime_toShow[j],
    WareHouse: data.storage,
    CarType: data.vehicle_group_Desc,
    CarLicense: data.vehicle_plate,
    DriverCheckTime: moment(data.driver_Checkin_Datetime).format("DD/MM/YYYY")+"\n"+tt1[0]+":"+tt1[1],
    queueNum: data.queue_number,
    recallAgain: "-"
    // DriverCheckTime: this.driver_check_time[j]

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
