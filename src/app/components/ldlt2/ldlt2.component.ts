import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Type from 'src/models/VariablesType';

import * as moment from 'moment';


@Component({
  selector: 'app-ldlt2',
  templateUrl: './ldlt2.component.html',
  styleUrls: ['./ldlt2.component.css']
})
export class Ldlt2Component implements OnInit {
  // ----------- get data from server
  getPlantNum: Type.ResponsePlant;
  getStoreNum: Type.ResponseStorage;
  getShipT: Type.ResponseShipmentType;
  getStat: Type.ResponseStatus;

  //------------- get data to display table
  getTable: Type.ResponseProcessSearchstatusOverAllbyuserid;


  //------------ data format packing
  SendOverAllbyuserid: Type.SendProcessSearchstatusOverAllbyuserid = {
    userId: null,
    invoiceNo: null,
    shipmentNo: null,
    deliveryNo: null,
    loadingDate: null,
    storageList: null,
    plantList: null,
    shipmentTypeId: null,
    currentStatusId: null
  }
  // ----------- sim data
  sim_GetPlant = {
    "result": [
      {
        "plantid": 1,
        "code": "120201",
        "name": "PP"
      },
      {
        "plantid": 2,
        "code": "120101",
        "name": "PP2"
      },
      {
        "plantid": 3,
        "code": "120101",
        "name": "PP3"
      },
      {
        "plantid": 4,
        "code": "120101",
        "name": "PP4"
      }
    ],
    "message": "OK"
  }

  sim_GetStorage = {
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
        "storage_code": "3555",
        "storage_name": "WH35 & WH55"
      },
      {
        "storageid": 4,
        "storage_code": "3622",
        "storage_name": "WH36 & WH22"
      }
    ],
    "message": "OK"
  }
  sim_getType = {
    "result": [
      {
        "shipmenttypeid": 1,
        "code": "Z101",
        "description": "WMS Trk Deliver DOM"
      },
      {
        "shipmenttypeid": 2,
        "code": "Z102",
        "description": "WMS Trk Deliver EXP"
      },
      {
        "shipmenttypeid": 3,
        "code": "Z103",
        "description": "WMB Trk Deliver BBB"
      }
    ],
    "message": "OK"
  }

  sim_getStatus = {
    "result": [
      {
        "currentstatusid": 1,
        "code": "1",
        "name": "Create Shipment"
      },
      {
        "currentstatusid": 2,
        "code": "2",
        "name": "Planning"
      }
    ],
    "message": "OK"
  }

  // sim_getTable = {
  //   "header": [
  //     "shipment_No",
  //     "current_status",
  //     "Loading_Datetime",
  //     "Shipment_Type",
  //     "current_status_id",
  //   ],
  //   "result": [
  //     {
  //       "shipment_No": "ship-1111",
  //       "current_status": "ZZZZ",
  //       "loading_Datetime": "13/11/2562 0:00:00",
  //       "shipment_Type": "Z101",
  //       "current_status_id": "1",
  //     },
  //     {
  //       "shipment_No": "ship-222222",
  //       "current_status": "",
  //       "loading_Datetime": "",
  //       "shipment_Type": "Z222",
  //       "current_status_id": null,
  //     },
  //     {
  //       "shipment_No": "ship-33333",
  //       "current_status": "ZZZZ",
  //       "loading_Datetime": "11/11/2562 0:00:00",
  //       "shipment_Type": "Z111",
  //       "current_status_id": "2",
  //     },
  //     {
  //       "shipment_No": "ship-44444",
  //       "current_status": "bbbbbb",
  //       "loading_Datetime": "11/11/2562 0:00:00",
  //       "shipment_Type": "Z4444",
  //       "current_status_id": "2",
  //     },

  //   ],
  //   "message": "OK"
  // }

  //------------------------------------------------ content

  content_header_name = "ระบบติดตาม Shipment กลาง (Shipment Tracking)";


  // ---------get date
  date_loading: string;

  //----------dropdown list
  plantNum = new FormControl();
  plantList: Array<string>;

  warehouseNum = new FormControl();
  warehouseList: Array<string>;

  shipmentType = new FormControl();
  shipmenttypeList: Array<string>;

  statusNum = new FormControl();
  statusList: Array<string>;

  invoiceNo = new FormControl();
  shipmentNo = new FormControl();
  deliveryNo = new FormControl();

  checked = false;

  //-------------- table data


  tabdat = new Array();
  head: Array<string>;

  constructor() { }

  ngOnInit() {


    //init datetime
    this.date_loading = moment().format("YYYY-MM-DDTHH:mm:ss");


    this.getPlantNum = this.sim_GetPlant as Type.ResponsePlant;
    this.getStoreNum = this.sim_GetStorage as Type.ResponseStorage;
    this.getShipT = this.sim_getType as Type.ResponseShipmentType;
    this.getStat = this.sim_getStatus as Type.ResponseStatus;

    //-----------------create ddl
    this.createPlantDropDown();
    // this.ResponseTable();


    // this.getTable = this.sim_getTable as ResponseProcessSearchstatusOverAllbyuserid;

    // if (this.getTable != undefined) {
    //   if (this.getTable.message == "OK") {
    //     for (let i = 0; i < this.sim_getTable.result.length; i++) {
    //       this.tabdat[i] = new Array();
    //       let data = Object.values(this.sim_getTable.result[i]);
    //       for (let j = 0; j < data.length; j++) {
    //         this.tabdat[i][j] = data[j];
    //       }
    //     }
    //     console.log("tabdat:", this.tabdat[0][1]);
    //   }

    // }

  }

  //--------get date
  GetDate(get_date) {
    this.date_loading = get_date;
    console.log(this.date_loading);
  }

  //------------------- create dropdown
  createPlantDropDown() {

    console.log("FUCKKKKKKKK")

    ////---------------------------plant
    if (this.getPlantNum != undefined) {
      if (this.getPlantNum.message == "OK") {
        let agent_list_ary = [];
        for (let l = 0; l < this.getPlantNum.result.length; l++) {
          agent_list_ary[l] = this.getPlantNum.result[l].name;

          // agent_list_ary[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.plantList = agent_list_ary;
        this.createDCDropDown();
      }
      else {
        console.warn("PLANT NUM DLL NOT SUCCESS");
      }
    }
  }

  createDCDropDown() {

    // ----------------------------------DC
    if (this.getStoreNum != undefined) {
      if (this.getStoreNum.message == "OK") {
        let dc_list_ary = [];
        for (let l = 0; l < this.getStoreNum.result.length; l++) {
          dc_list_ary[l] = this.getStoreNum.result[l].storage_name;
        }
        this.warehouseList = dc_list_ary;
        this.createTypeDropDown();
      }
      else {
        console.warn("SOTRE NUM DLL NOT SUCCESS");
      }
    }
  }

  createTypeDropDown() {
    //---------------------------shipmentType
    if (this.getShipT != undefined) {
      if (this.getShipT.message == "OK") {
        let shipType_list_ary = [];
        for (let l = 0; l < this.getShipT.result.length; l++) {
          shipType_list_ary[l] = this.getShipT.result[l].description;
        }
        this.shipmenttypeList = shipType_list_ary;
        this.createStatusDropdown();
      }
      else {
        console.warn("SHIPMENT TYPE DLL NOT SUCCESS");

      }
    }
  }

  createStatusDropdown() {
    //-------------------------------status
    if (this.getStat != undefined) {
      if (this.getStat.message == "OK") {
        let status_list_ary = [];
        for (let l = 0; l < this.getStat.result.length; l++) {
          status_list_ary[l] = this.getStat.result[l].name;
        }
        this.statusList = status_list_ary;
      }
    }
  }

  datatoSearch() {
    // console.log("date:" + this.date_loading)
    console.warn(this.plantNum.value, this.warehouseNum.value, this.shipmentNo.value, this.statusNum.value);
    console.log(this.SendOverAllbyuserid)
    // console.warn(this.invoiceNo.value,this.shipmentNo.value, this.deliveryNo.value);
    // let selcted_plantno_ary, sel_dcnum_ary, sel_shipt_ary, sel_status_ary = [];
    // console.log(this.getPlantNum);
    // console.log(this.plantNum.value);

    if (this.plantNum.value == null) {
      this.SendOverAllbyuserid.plantList = "null";
    }

    if (this.warehouseNum.value == null) {
      this.SendOverAllbyuserid.storageList = "null";
    }

    if (this.shipmentType.value == null) {
      this.SendOverAllbyuserid.shipmentTypeId = "null";
    }

    if (this.statusNum.value == null) {
      this.SendOverAllbyuserid.currentStatusId = "null";
    }

    let null1 = "";
    null1 = null1.toString();
    console.log("null as", null1)

    if (this.invoiceNo.value == null) {
      this.SendOverAllbyuserid.invoiceNo = "null";
    }

    if (this.shipmentNo.value == null) {
      this.SendOverAllbyuserid.shipmentNo = "null";
    }
    if (this.deliveryNo.value == null) {
      this.SendOverAllbyuserid.deliveryNo = "null";
    }

    if (this.plantNum.value != null) {
      console.log("NOT NULL LOOP: " + this.plantNum.value);
      this.packSelected1(this.plantNum.value);
    }

    if (this.warehouseNum.value != null) {
      console.log(this.warehouseNum.value);
      this.packSelected2(this.warehouseNum.value);
    }

    if (this.shipmentType.value != null) {
      console.log(this.shipmentType.value);
      this.packSelected3(this.shipmentType.value);
    }

    if (this.statusNum.value != null) {
      console.log(this.statusNum.value);
      this.packSelected4(this.statusNum.value);
    }

    this.SendOverAllbyuserid.loadingDate = this.date_loading;
    this.SendOverAllbyuserid.invoiceNo = this.invoiceNo.value;
    this.SendOverAllbyuserid.shipmentNo = this.shipmentNo.value;
    this.SendOverAllbyuserid.deliveryNo = this.deliveryNo.value;
    this.SendOverAllbyuserid.userId = 2;
    this.ResponseTable()
  }

  packSelected1(b) {
    let selcted_plantno_ary = [];
    // let sel_dcnum_ary = [];
    // , sel_shipt_ary, sel_status_ary = [];

    for (let n = 0; n < this.plantNum.value.length; n++) {
      for (let i = 0; i < this.getPlantNum.result.length; i++) {
        // console.log(this.plantNum.value[n],this.getPlantNum.result[i].name);
        if (this.plantNum.value[n] == this.getPlantNum.result[i].name) {
          let a = this.getPlantNum.result[i].plantid;
          // this.SendPlantNum.plantId = a;

          selcted_plantno_ary[n] = a;

        }
      }

    }
    // console.log("put" + selcted_plantno_ary)
    let sel_plant_num = selcted_plantno_ary.toString().replace(/,/g, '|');
    // console.log("selected plant id: " + sel_plant_num);
    this.SendOverAllbyuserid.plantList = sel_plant_num;

  }

  packSelected2(b) {
    let sel_dcnum_ary = [];
    for (let n = 0; n < this.warehouseNum.value.length; n++) {
      // console.log("length storage"+n +":"+ this.warehouseNum.value.length)
      for (let i = 0; i < this.getStoreNum.result.length; i++) {
        // console.log(this.warehouseNum.value[n], this.getStoreNum.result[i].storage_name);
        if (this.warehouseNum.value[n] == this.getStoreNum.result[i].storage_name) {
          let a = this.getStoreNum.result[i].storageid;
          // this.SendPlantNum.plantId = a;

          sel_dcnum_ary[n] = a;

        }
      }
    }
    // console.log("put DC:" + sel_dcnum_ary)
    let sel_dc_num = sel_dcnum_ary.toString().replace(/,/g, '|');
    // console.log("selected dc id: " + sel_dc_num);
    this.SendOverAllbyuserid.storageList = sel_dc_num;
  }

  packSelected3(b) {

    let sel_shipt_ary = [];

    //------------------------------------selected shipment type
    for (let n = 0; n < this.shipmentType.value.length; n++) {
      for (let i = 0; i < this.getShipT.result.length; i++) {
        if (this.shipmentType.value[n] == this.getShipT.result[i].description) {
          let a = this.getShipT.result[i].shipmenttypeid;

          sel_shipt_ary[n] = a;

        }
      }

    }

    let sel_ship_num = sel_shipt_ary.toString().replace(/,/g, '|');
    // console.log("selected shipment id: " + sel_ship_num);
    this.SendOverAllbyuserid.shipmentTypeId = sel_ship_num;


  }

  packSelected4(b) {

    let sel_status_ary = [];

    //---------------------------------selected status type
    for (let n = 0; n < this.statusNum.value.length; n++) {
      for (let i = 0; i < this.getStat.result.length; i++) {
        if (this.statusNum.value[n] == this.getStat.result[i].name) {
          let a = this.getStat.result[i].currentstatusid;

          sel_status_ary[n] = a;

        }
      }

    }

    let sel_status = sel_status_ary.toString().replace(/,/g, '|');
    // console.log("selected status id: " + sel_status);
    this.SendOverAllbyuserid.currentStatusId = sel_status;
  }

  sim_getTable = new Array();

  ResponseTable() {
    console.log("Response")

    let sim_getTable = {
      "header": [
        "shipment_No",
        "current_status",
        "Loading_Datetime",
        "Shipment_Type",
        "current_status_id",
      ],
      "result": [
        {
          "shipment_No": "ship-1111",
          "current_status": "ZZZZ",
          "loading_Datetime": "13/11/2562 0:00:00",
          "shipment_Type": "Z101",
          "current_status_id": "1",
        },
        {
          "shipment_No": "ship-222222",
          "current_status": "",
          "loading_Datetime": "",
          "shipment_Type": "Z222",
          "current_status_id": null,
        },
        {
          "shipment_No": "ship-33333",
          "current_status": "ZZZZ",
          "loading_Datetime": "11/11/2562 0:00:00",
          "shipment_Type": "Z111",
          "current_status_id": "2",
        },
        {
          "shipment_No": "ship-44444",
          "current_status": "bbbbbb",
          "loading_Datetime": "11/11/2562 0:00:00",
          "shipment_Type": "Z4444",
          "current_status_id": "2",
        },

      ],
      "message": "OK"
    }

    this.getTable = sim_getTable as Type.ResponseProcessSearchstatusOverAllbyuserid;

    if (this.getTable != undefined) {
      if (this.getTable.message == "OK") {
        for (let i = 0; i < this.getTable.result.length; i++) {
          this.tabdat[i] = new Array();
          let data = Object.values(this.getTable.result[i]);
          for (let j = 0; j < data.length; j++) {
            this.tabdat[i][j] = data[j];
          }
        }
        console.log("tabdat:", this.tabdat[0][1]);
      }

    }

  }

  clearSearch() {
    console.log("clear search");
    this.plantNum.reset()
    this.warehouseNum.reset()
    this.statusNum.reset()
    this.shipmentType.reset()

    this.invoiceNo.reset()
    this.deliveryNo.reset()
    this.shipmentNo.reset()

  }

  refresh(check) {


    if (check.checked == true) {
      var t = setInterval(this.datatoSearch, 5000);
    } else {
      console.log("cancel refresh");
      clearInterval(t);
    }

  }




}
