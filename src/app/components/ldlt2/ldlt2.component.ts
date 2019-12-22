import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { ResponseGetPlant, ResponseGetStorage, ResponseGetShipmentType, ResponseGetStatus } from 'src/models/VariablesType';

import * as moment from 'moment';


@Component({
  selector: 'app-ldlt2',
  templateUrl: './ldlt2.component.html',
  styleUrls: ['./ldlt2.component.css']
})
export class Ldlt2Component implements OnInit {
  // ----------- get data from server
  getPlantNum: ResponseGetPlant;
  getStoreNum: ResponseGetStorage;
  getShipT: ResponseGetShipmentType;
  getStat: ResponseGetStatus;

  SendPlantNum = {
    loadingDate: null,
    plantId: null,
    storageId: null,
    shipmentId: null,
    statusId: null,
    invoiceNo: null,
    shipmentNo: null,
    deliveryNo: null
  }

  SendOverAllbyuserid = {
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
        "name": "PP1"

      },
      {
        "plantid": 2,
        "code": "120201",
        "name": "PP2",

      },
      {
        "plantid": 3,
        "code": "120201",
        "name": "PP3",

      },
      {
        "plantid": 5,
        "code": "120201",
        "name": "PP5"
      },

      //---test different id with diff name
      {
        "plantid": 4,
        "code": "120201",
        "name": "PP66"


      }
    ]
  }

  sim_GetStorage = {
    "result": [
      {
        "id": 1,
        "storage_code": "36",
        "storage_name": "WH36",
        "is_active": "Y"
      },
      {
        "id": 2,
        "storage_code": "3643",
        "storage_name": "WH36 & WH43",
        "is_active": "Y"
      },

      {
        "id": 3,
        "storage_code": "36T",
        "storage_name": "WH36 WMS",
        "is_active": "Y"

      },
      {
        "id": 4,
        "storage_code": "34T",
        "storage_name": "WH090 BMW",
        "is_active": "Y"

      }

    ],
    "message": "OK"
  }

  sim_getType = {
    "result": [
      {
        "id": 1,
        "code": "Z101",
        "description": "WMS Trk Deliver DOM"
      },
      {
        "id": 2,
        "code": "Z102",
        "description": "WMS Trk Deliver EXP"
      },
      {
        "id": 3,
        "code": "Z103",
        "description": "WMS Trk Own Pickup"
      }
    ],
    "message": "OK"
  }

  sim_getStatus = {
    "result": [
      {
        "id": 1,
        "code": "1",
        "name": "Create Shipment",
        "is_active": "Y"
      },
      {
        "id": 2,
        "code": "2",
        "name": "Planning",
        "is_active": "Y"
      },
      {
        "id": 3,
        "code": "3",
        "name": "Estimate Check in",
        "is_active": "Y"
      }
    ],
    "message": "OK"
  }

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

  tableHeader = ["Loading Date", "Shipment Type",
    "DC No.", "Status",
    "Deliver No.", "Shipment No."];

  //--------------------sim table data
  tableData = [
    // {
    //   loadingDate: "20-11-2019",
    //   shipType: "Z103",
    //   dcNo: "WH40",
    //   // status:"create shipment", 
    //   shipmentNo: "62123"
    // },

    {
      loadingDate: "21-11-2019",
      shipType: "Z105",
      dcNo: "WH44",
      // status:"Planning Time", 
      shipmentNo: "66666"
    }



    // {
    //   loadingDate: "22-11-2019",
    //   shipType: "Z115",
    //   dcNo: "WH40",
    //   status: "Planning Time", cusPickup: "10-395 สมเดช",
    //   shipmentNo: "66666", deliverNo: "30219123", matDoc: "Default",
    //   grade: "1102K", lot: "123019", quantity: "10000",
    //   truckload: "15000", customer: "ABC", planningTime: "09:00",
    //   prodPrepTime: "08:30", truckCheckTime: "08:50", driverCheckTime: "08:30",
    //   LoadingTime: "09:00", weightinTime: "09:12",
    //   labourRegTime: "09:35", weightoutTime: "09:39"


    // }



  ];

  constructor() { }

  ngOnInit() {

    this.date_loading = moment().format("YYYY-MM-DDTHH:mm:ss"); //init datetime


    this.getPlantNum = this.sim_GetPlant as ResponseGetPlant;
    this.getStoreNum = this.sim_GetStorage as ResponseGetStorage;
    this.getShipT = this.sim_getType as ResponseGetShipmentType;
    this.getStat = this.sim_getStatus as ResponseGetStatus;
    this.createPlantDropDown();

  }

  //--------get date
  GetDate(get_date) {
    this.date_loading = get_date;
    console.log(this.date_loading);
  }

  //------------------- create dropdown
  createPlantDropDown() {


    ////--------plant
    let agent_list_ary = [];
    for (let l = 0; l < this.getPlantNum.result.length; l++) {


      agent_list_ary[l] = this.getPlantNum.result[l].name;

      // agent_list_ary[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.plantList = agent_list_ary;

    // ---------DC
    let dc_list_ary = [];
    for (let l = 0; l < this.getStoreNum.result.length; l++) {
      dc_list_ary[l] = this.getStoreNum.result[l].storage_name;
    }
    this.warehouseList = dc_list_ary;

    //----------shipmentType
    let shipType_list_ary = [];
    for (let l = 0; l < this.getShipT.result.length; l++) {
      shipType_list_ary[l] = this.getShipT.result[l].description;
    }
    this.shipmenttypeList = shipType_list_ary;

    //------------status
    let status_list_ary = [];
    for (let l = 0; l < this.getStat.result.length; l++) {
      status_list_ary[l] = this.getStat.result[l].name;
    }
    this.statusList = status_list_ary;

  }



  datatoSearch() {



    // console.log("date:" + this.date_loading)
    console.warn(this.plantNum.value, this.warehouseNum.value, this.shipmentNo.value, this.statusNum.value);
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


    console.log(this.SendOverAllbyuserid.invoiceNo)
    console.log(this.SendOverAllbyuserid)


  }

  packSelected1(b) {

    console.log("pack " + b)

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
    console.log("selected plant id: " + sel_plant_num);
    this.SendOverAllbyuserid.plantList = sel_plant_num;

  }
  packSelected2(b) {
    let sel_dcnum_ary = [];

    for (let n = 0; n < this.warehouseNum.value.length; n++) {
      // console.log("length storage"+n +":"+ this.warehouseNum.value.length)
      for (let i = 0; i < this.getStoreNum.result.length; i++) {
        // console.log(this.warehouseNum.value[n], this.getStoreNum.result[i].storage_name);
        if (this.warehouseNum.value[n] == this.getStoreNum.result[i].storage_name) {
          let a = this.getStoreNum.result[i].id;
          // this.SendPlantNum.plantId = a;

          sel_dcnum_ary[n] = a;

        }
      }
    }
    // console.log("put DC:" + sel_dcnum_ary)
    let sel_dc_num = sel_dcnum_ary.toString().replace(/,/g, '|');
    console.log("selected dc id: " + sel_dc_num);
    this.SendOverAllbyuserid.storageList = sel_dc_num;
  }

  packSelected3(b) {

    let sel_shipt_ary = [];

    //------------------------------------selected shipment type
    for (let n = 0; n < this.shipmentType.value.length; n++) {
      for (let i = 0; i < this.getShipT.result.length; i++) {
        if (this.shipmentType.value[n] == this.getShipT.result[i].description) {
          let a = this.getShipT.result[i].id;

          sel_shipt_ary[n] = a;

        }
      }

    }

    let sel_ship_num = sel_shipt_ary.toString().replace(/,/g, '|');
    console.log("selected shipment id: " + sel_ship_num);
    this.SendOverAllbyuserid.shipmentTypeId = sel_ship_num;


  }

  packSelected4(b) {

    let sel_status_ary = [];

    //---------------------------------selected status type
    for (let n = 0; n < this.statusNum.value.length; n++) {
      for (let i = 0; i < this.getStat.result.length; i++) {
        if (this.statusNum.value[n] == this.getStat.result[i].name) {
          let a = this.getStat.result[i].id;

          sel_status_ary[n] = a;

        }
      }

    }

    let sel_status = sel_status_ary.toString().replace(/,/g, '|');
    console.log("selected status id: " + sel_status);
    this.SendOverAllbyuserid.currentStatusId = sel_status;
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
