import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Type from 'src/models/VariablesType';
import * as Comp from 'src/models/ComponentClass';
import * as moment from 'moment';


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
  // statusList: string[] = ['รอการเริ่มงาน', 'รอการจบงาน'];
  statusList = [
    { "statusid": 11, "statusName": "รอการเริ่มงาน" },
    { "statusid": 12, "statusName": "รอการจบงาน" },

  ];

  prodPack = new FormControl('คนงาน');
  prodPackList = [
    { "isFolkLiftID": "N", "isFolkLiftName": "คนงาน" },
    { "isFolkLiftID": "Y", "isFolkLiftName": "Fork Lift" }
  ];

  worker1 = new FormControl();
  worker1List: string[] = ['นาย ก.', 'นาย ข.', 'นาย ค.', 'นาย ง.'];

  worker2 = new FormControl();
  worker2List: string[] = ['นาย ก.', 'นาย ข.', 'นาย ค.', 'นาย ง.'];

  typeUD = new FormControl();
  typeUDList = [
    { "up_downID": "U", "up_downName": "ขาขึ้น" },
    { "up_downID": "D", "up_downName": "ขาลง" }
  ];

  //--------------GET DATA FOR DDL
  getWarehouse: Type.ResponseCbStorage;
  getLabour: Type.ResponseLabour;

  //--------------GET table data
  getResProSearchLab: Type.ResponseProcessSearchLabour;

  //---------------------sim data to test
  sim_getStorage = {
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
      },
      {
        "storageid": 3,
        "storage_code": "37",
        "storage_name": "WH37"
      },
      {
        "storageid": 4,
        "storage_code": "3637",
        "storage_name": "WH36 & WH37"
      }
    ],
    "message": "OK"
  }

  sim_getLabour = {
    "result": [
      {
        "lobour_id": 2,
        "lobour_name": "วรรธนนันท์ ศรีประสิทธิ์"
      },
      {
        "lobour_id": 3,
        "lobour_name": "อุทัย ทิพสุวรรณ"
      },
      {
        "lobour_id": 4,
        "lobour_name": "ศิริพงศ์"
      },
      {
        "lobour_id": 5,
        "lobour_name": "นิติกร"
      }
    ],
    "message": "OK"
  }

  //--------------- sim response data for ProSearchLabour
  sim_resProSeaLab = {
    "result": [
      {
        "shipemnt_type": "Z102",
        "vehicle_text": "703206สค",
        "storage": null,
        "storage_id": 33,
        "dock": null,
        "shipment_no": 51,
        "shipment_id": 51,
        "delivery_no": "3140153881",
        "delivery_id": 111,
        "grade": "HI650",
        "qty": 20000.000,
        "isforklift": null,
        "labor_id1": null,
        "labor_id2": null
      },
      {
        "shipemnt_type": "Z103",
        "vehicle_text": "7555555สค",
        "storage": null,
        "storage_id": 35,
        "dock": null,
        "shipment_no": 51,
        "shipment_id": 51,
        "delivery_no": "3140153881",
        "delivery_id": 222,
        "grade": "HI650",
        "qty": 20000.000,
        "isforklift": null,
        "labor_id1": null,
        "labor_id2": null
      }
    ],
    "message": "OK"
  }

  TableHeader = ["ลำดับ", "Shipment Type", "ทะเบียน", "หน้าท่า", "ช่องบรรจุสินค้า", "Shipment No.", "Deliver No.", "Grade", "Qty", "ประเภทขา",
    "ประเภท", "คนงานที่ 1", "คนงานที่ 2", ""];

  //---------------date
  loading_date: string;

  //---------------toggle param
  sel_status: string;

  //----------------disable woker ddl
  bt_save: Array<boolean> = [true];



  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.loading_date = moment().format("YYYY-MM-DDTHH:mm:ss");
    this.getWarehouse = this.sim_getStorage as Type.ResponseCbStorage;
  }

  GetDate(get_date) {

    this.loading_date = get_date + "00:00:00.000";
    console.log("loading Date:", this.loading_date);
  }

  //--------send to search param for API
  storageID: string;
  statusID: string;

  //-----------param to ManualStartLabourForklift
  deliverid_ary = [];
  wh_do_ary = [];
  up_down_ary = [];
  Isforklift_ary = [];
  labor_id1_ary = [];
  labor_id2_ary = [];

  datatoSearch() {
    if (this.warehouseNum.value == null) {
      this.storageID = "null";
    }
    else {
      this.storageID = this.warehouseNum.value.toString().replace(/,/g, '|')
    }

    if (this.statusNum.value != null) {
      if (this.statusNum.value == "11") {
        this.statusID = "11";
        this.sel_status = "รอเริ่มงาน";
      }
      if (this.statusNum.value == "12") {
        this.statusID = "12";
        this.sel_status = "รอจบงาน";
      }
      this.getResProSearchLab = this.sim_resProSeaLab as Type.ResponseProcessSearchLabour;

    }
    else {
      alert("กรุณาเลือกสถานะ")
    }

    //------ API to send
    //-------api/v1/Process/ProcessSearchLaborProcess?loadingDate=2019-12-11 00:00:00.000&storageId=1&statusId=11
    console.log("loadingDate: ", this.loading_date, "storageID: ", this.storageID, "statusID: ", this.statusID)

    // this.getResProSearchLab = this.sim_resProSeaLab as Type.ResponseProcessSearchLabour;
    if (this.getResProSearchLab.message == "OK") {

      this.getLabour = this.sim_getLabour as Type.ResponseLabour;
      console.log("TABLE OK")
    }
  }



  selectedToSave(evt, i, type) {
    console.log(evt, i, type);

    if (type == 'forklift') {
      if (evt == "Y") {
        this.Isforklift_ary[i] = evt;
        this.labor_id1_ary[i] = 0;
        this.labor_id2_ary[i] = 0;
        this.bt_save[i] = true;
      }
      else {
        this.Isforklift_ary[i] = evt;
        this.bt_save[i] = false;
      }
    }

    if (type == 'updown') {
      this.up_down_ary[i] = evt;
    }

    //-------------get workerID
    if (type == "workerID1") {
      this.labor_id1_ary[i] = evt;
    }
    if (type == "workerID2") {
      this.labor_id2_ary[i] = evt;
    }

  }

  sendStart(i) {


    // console.log(i, "updwon:", this.up_down_ary, "forklift:", this.Isforklift_ary, "worker1:", this.labor_id1_ary, "worker2:", this.labor_id2_ary)
    let deliverid = this.getResProSearchLab.result[i].delivery_id;
    let wh_do = this.getResProSearchLab.result[i].storage_id;
    let up_down = this.up_down_ary[i];
    let isforklift = this.Isforklift_ary[i];
    let labor_id1 = this.labor_id1_ary[i];
    let labor_id2 = this.labor_id2_ary[i];
    let userId = 999;

    //----------api/v1/Process/ProcessManualStartLabourForklift?deliverid=111&wh_do=11&up_down=U&Isforklift=N&labor_id1=2&labor_id2=3&userId=999

    console.log("sendtoStart:", i, "deliverID:", deliverid, "wh_no:", wh_do, "updown:", up_down, "isforklift", isforklift, "worker1:", labor_id1, "worker2:", labor_id2);
  }

  sendEnd(i) {

    //----------api/v1/Process/ProcessManualEndLabourForklift?deliverid=111&wh_do=11&userId=999
    let deliverid = this.getResProSearchLab.result[i].delivery_id;
    let wh_do = this.getResProSearchLab.result[i].storage_id;
    let userId = 999;
    console.log("sendtoEnd",i, "deliverId:", deliverid,"wh_do:", wh_do);
  }

}
