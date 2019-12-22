import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName } from '@angular/forms';
import { format } from 'util';
import {
  ResponseShipmentType, ResponseCarrier, ResponseStatus, ResponseReqQequipments, ResponseVehicleGroup,
  ResponseYesNo, ResponseTypePacking, ResponseRoute, SendProcessAssignVendorQuota
} from 'src/models/VariablesType';
import * as moment from 'moment';


export interface shipTail {
  value: string;
}




@Component({
  selector: 'app-ldlt1',
  templateUrl: './ldlt1.component.html',
  styleUrls: ['./ldlt1.component.css']
})



export class Ldlt1Component implements OnInit {

  //---------get data from server
  getShipType: ResponseShipmentType;
  getCarrierName: ResponseCarrier;
  getStatus: ResponseStatus;
  getVehicleGroup: ResponseVehicleGroup;
  getYesNo: ResponseYesNo;
  getReqEquipments: ResponseReqQequipments;
  getTypePacking: ResponseTypePacking;
  getRoute: ResponseRoute;


  public show: boolean = false;
  public show1: boolean = false;
  public remark: boolean = false;
  public disableShip: boolean = true;
  public car: string;
  bt_save: Array<boolean> = [false];
  public route_save: boolean = true;
  events: string[] = [];
  public shipdiv: boolean = false;
  public shipdiv1: boolean = true;
  search1;


  //------------------------ sim data
  sim_shipType = {
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
      }
    ],
    "message": "OK"
  }

  sim_carrierName = {
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
      }
    ],
    "message": "OK"
  }

  sim_status = {
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

  sim_ReqEquip = {
    "result": [
      {
        "reqqequipmentsid": 1,
        "code": "ddl1",
        "name": "-"
      },
      {
        "reqqequipmentsid": 2,
        "code": "ddl2",
        "name": "Jumbo"
      },
      {
        "reqqequipmentsid": 3,
        "code": "ddl3",
        "name": "On Pallet"
      }
    ],
    "message": "OK"
  }

  sim_vehicleGroup = {
    "result": [
      {
        "vehiclegroupid": 1,
        "code": "10",
        "description": "รถรับเอง"
      },
      {
        "vehiclegroupid": 2,
        "code": "11",
        "description": "รถ 6 ล้อ"
      },
      {
        "vehiclegroupid": 3,
        "code": "12",
        "description": "รถ 10 ล้อ"
      }
    ],
    "message": "OK"
  }

  sim_yesno = {
    "result": [
      {
        "yesnoid": 1,
        "code": "Y",
        "name": "Yes"
      },
      {
        "yesnoid": 2,
        "code": "N",
        "name": "No"
      }
    ],
    "message": "OK"
  }

  sim_typePacking = {
    "result": [
      {
        "typepackingid": 1,
        "code": "ddl1",
        "name": "คนงาน"
      },
      {
        "typepackingid": 2,
        "code": "ddl2",
        "name": "รถ Folk Lift "
      },
      {
        "typepackingid": 3,
        "code": "ddl3",
        "name": "Bulk Truck"
      }
    ],
    "message": "OK"
  }

  sim_route = {
    "result": [
      {
        "routeid": 1,
        "code": "2R0007",
        "description": "P:แหลมฉบัง - IRPC - แหลมฉบัง"
      },
      {
        "routeid": 2,
        "code": "2R0008",
        "description": "P:แหลมฉบัง - IRPC - ศรีราชา"
      }
    ],
    "message": "OK"
  }


  //-------------------------- get data
  searchkeyword = new FormControl();

  ShipType = new FormControl();
  shipment_Type: Array<string>;

  CarrierName = new FormControl();
  Carrier_Name: Array<string>;

  date_from: string;

  date = new FormControl();
  type1 = new FormControl();
  dateFrom = new FormControl();



  shipmentStatus = new FormControl();
  shipment_Status: Array<string>;

  //---------------urgent car | yesno
  UrgentShipment = new FormControl("no");
  Urgent_list: Array<string>;

  //---------------require equipment
  AddTool = new FormControl("none");
  additionalTool: Array<string>;


  vehicle_Group = new FormControl();
  vehicleGroup_list: Array<string>;


  ShipmentPacker = new FormControl("default");
  PackerList: Array<string>;

  get_route = new FormControl();
  RouteList: Array<string>;


  OutPickUp = new FormControl("no");

  public transname1: any;



  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information (Sum ของยอดรถรวมที่ผู้ขนส่งแจ้ง - Quota ที่ขนส่งให้):";


  // shipment_Type = ["Domestic", "Export"];
  // Carrier_Name = ["ตะวันรุ่ง ทรานส์", "KEERY xpress", "TRUCK 999"];
  // shipment_Status = ["รอแผนกขนส่งลง Planning", "รอผู้ขนส่ง confirm"];

  TableHeader = ["No.", "Shipment No.", "Delivery No.", "Invoice No.", "Boking No.", "Closing Time", "Grade", "Qty (Kg)", "Truck Load", "ประเภทรถ", "Shipment (หาง)", "รถตีด่วน", "ต้องการอุปกรณ์", "คนบรรจุสินค้า", "Remark", "Picking At", "Return To", "Route", "รับของข้างนอก", "จำนวนกรรมกรลงสินค้า", "Planning Time", "", ""];

  TableData = [
    {
      shipmentNum: "SN-88989", deliveryNum: "DO-87897", invoiceNum: "IRPC-0909",
      BookingNum: "BB-023113", closingTime: "09:10", grade: "A", quantity: 60, truckLoad: 90,
      shipmentType: "รถสิบล้อ", shipmentTail: "ipasdfp", urgentCar: "no",
      additionalTool: "on Pallet", packer: "folk-lift", remark: "KOPPER",
      pickupAt: "Suratthani", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "11.44"
    },

    {
      shipmentNum: "SN-887765", deliveryNum: "DO-1111", invoiceNum: "IRPC-11111",
      BookingNum: "BB-32467", closingTime: "09:10", grade: "A", quantity: 40, truckLoad: 50,
      shipmentType: "รถพ่วง", shipmentTail: "qqqqqqqqq", urgentCar: "no",
      additionalTool: "None", packer: "Bulk", remark: "KDLLAO",
      pickupAt: "CNX", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "12.44"
    },


    {
      shipmentNum: "SN-878718", deliveryNum: "DO-1971", invoiceNum: "IRPC-116123",
      BookingNum: "BB-32467", closingTime: "09:10", grade: "A", quantity: 40, truckLoad: 50,
      shipmentType: "รถสิบล้อ พ่วงข้าง", shipmentTail: "qqqqqqqqq", urgentCar: "no",
      additionalTool: "None", packer: "Bulk", remark: "KDLLAO",
      pickupAt: "CNX", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "12.44"
    },

    {
      shipmentNum: "SN-875165", deliveryNum: "DO-1977", invoiceNum: "IRPC-116123",
      BookingNum: "BB-32467", closingTime: "09:10", grade: "A", quantity: 40, truckLoad: 50,
      shipmentType: "รถสิบล้อ พ่วงข้าง", shipmentTail: "qqqqqqqqq", urgentCar: "no",
      additionalTool: "None", packer: "Bulk", remark: "KDLLAO",
      pickupAt: "CNX", returnTo: "BKK", route: "no", outsidePickup: "no",
      workerNum: 3, planningTime: "12.44"
    },
  ];


  // cartype: cartype[] = [
  //   { value: "รถพ่วง", viewValue: "รถพ่วง" },
  //   { value: "รถสิบล้อ", viewValue: "รถสิบล้อ" }
  // ];


  // productPacker: prodPacker[] = [
  //   { value: "default", viewValue: "ใช้คนงาน" },
  //   { value: "fork lift", viewValue: "ใช้ Forklift" },
  //   { value: "sea bulk", viewValue: "Sea Bulk" },
  //   { value: "bulk truck", viewValue: "Bulk Truck" }
  // ];



  shiptail: shipTail[] = [
    { value: "IRE0012" },
    { value: "IRE0982" },
  ]



  _object = Object;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit() {

    // this.date_from = moment().format("YYYY-MM-DDTHH:mm:ss"); //init datetime


    this.getShipType = this.sim_shipType as ResponseShipmentType;
    this.getCarrierName = this.sim_carrierName as ResponseCarrier;
    this.getStatus = this.sim_status as ResponseStatus;

    this.getVehicleGroup = this.sim_vehicleGroup as ResponseVehicleGroup;
    this.getYesNo = this.sim_yesno as ResponseYesNo;
    this.getReqEquipments = this.sim_ReqEquip as ResponseReqQequipments;
    this.getTypePacking = this.sim_typePacking as ResponseTypePacking;
    this.getRoute = this.sim_route as ResponseRoute;

    this.CreateDropDownList();

    // console.log(this._object);
  }

  CreateDropDownList() {

    //-----------------sipmenttype ddl
    let list_ary = [];
    for (let l = 0; l < this.getShipType.result.length; l++) {
      list_ary[l] = this.getShipType.result[l].description;

      // agent_list_ary[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.shipment_Type = list_ary;

    //---------------carrier ddl
    let carrier_list_ary = [];
    for (let l = 0; l < this.getCarrierName.result.length; l++) {
      carrier_list_ary[l] = this.getCarrierName.result[l].name;

      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.Carrier_Name = carrier_list_ary;

    //-------------------status ddl
    let status_list_ary = [];
    for (let l = 0; l < this.getStatus.result.length; l++) {
      status_list_ary[l] = this.getStatus.result[l].name;

      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.shipment_Status = status_list_ary;

    //------------- vehicle group ddl
    let vhcG_list_ary = [];
    for (let l = 0; l < this.getVehicleGroup.result.length; l++) {
      vhcG_list_ary[l] = this.getVehicleGroup.result[l].description;

      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.vehicleGroup_list = vhcG_list_ary;

    //----------------- require equip ddl
    let reqEq_list_ary = [];
    for (let l = 0; l < this.getReqEquipments.result.length; l++) {
      reqEq_list_ary[l] = this.getReqEquipments.result[l].name;
      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.additionalTool = reqEq_list_ary;

    //----------------------- yes no ddl
    let yn_list_ary = [];
    for (let l = 0; l < this.getYesNo.result.length; l++) {
      yn_list_ary[l] = this.getYesNo.result[l].name;
      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.Urgent_list = yn_list_ary;

    //------------------- type packing ddl
    let typePacking_list_ary = [];
    for (let l = 0; l < this.getTypePacking.result.length; l++) {
      typePacking_list_ary[l] = this.getTypePacking.result[l].name;
      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.PackerList = typePacking_list_ary;

    //--------------- route ddl
    let route_list_ary = [];
    for (let l = 0; l < this.getRoute.result.length; l++) {
      route_list_ary[l] = this.getRoute.result[l].description;
      // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
    }
    this.RouteList = route_list_ary;




  }

  selected(Droplist) {
    console.log(Droplist);
    if (Droplist == "Create Shipment") {
      console.log("กดรอ confirm จ้า");
      // this.show = !this.show;
      // this.show1 = false;

      this.show1 = !this.show1;
      this.show = false;

      this.shipdiv1 = false;
      this.shipdiv = true;

    }

    if (Droplist == "Planning") {
      // this.show1 = !this.show1;
      // this.show = false;

      this.show = !this.show;
      this.show1 = false;

      this.shipdiv1 = true;
      this.shipdiv = false;
    }
  }

  print(this) {
    console.log(this.value);
  }

  filterTab(this) {

    console.log("click to filter");

  }

  toggleRemark(i) {
    this.remark = !this.remark;
    console.log("toggle Remark" + i);

  }

  disableDropdown(value, i) {

    var num = i;

    console.log(value, i);
    // console.log(this);
    if (value != "รถพ่วง") {

      this.bt_save[num] = false;

    }
    else {
      this.bt_save[num] = true;

    }

    if (value == "Domestic") {
      this.route_save = false;
    }

    if (value == "Export") {
      this.route_save = true;
      console.log("load form tBConfig");
    }
    console.log("domestic loop");

  }


  Shiptail(value) {

    console.log("shiptail ddl: " + value);


  }

  inputEvent(event) {

    // this.dateFrom.date = event;
    // this.getData(this.dateFrom.date);
    console.log("selectedDated");
  }

  // inputEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  //   this.events.push(`${type}: ${event.value}`);
  //   // console.log(events);

  // }

  deleteRow(j) {
    // console.log("delete:" + j);
    // this.TableData.splice(j, 1);
    console.log(this.UrgentShipment.value, this.AddTool.value, this.UrgentShipment.value, this.AddTool.value);

  }

  datatoSearch() {


    console.log(this.ShipType.value);
    console.log(this.date_from);
    // console.log("send data to serch for table" + this.date.value);
    // var date_from = (this.dateFrom.value).toDateString();
    // console.log("date from:" + date_from);
    // var date_date = (this.date.value).getDate();
    // var date_month = (this.date.value).getMonth();
    // var date_year = (this.date.value).getYear();
    // console.log("date:" + date_date);
    // console.log("month:" + date_month);
    // console.log("year:" + date_year);
    // console.warn(this.ShipType.value, date_from, this.shipmentStatus.value)

  }

  GetDate(get_date) {

    this.date_from = get_date;
    console.log(this.date_from);

  }

  searchTable(event) {

    console.log("searchTable llop" + this.searchkeyword.value);

  }

  returnQuota(i) {
    console.log("return quota button: " + i)
  }



}
