import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName } from '@angular/forms';


// import {
//   ResponseShipmentType, ResponseCarrier, ResponseStatus, ResponseReqQequipments, ResponseVehicleGroup,
//   ResponseYesNo, ResponseTypePacking, ResponseRoute, SendProcessAssignVendorQuota
// } from 'src/models/VariablesType';
import * as Type from 'src/models/VariablesType';
import * as Comp from 'src/models/ComponentClass'
import * as moment from 'moment';


@Component({
  selector: 'app-ldlt1',
  templateUrl: './ldlt1.component.html',
  styleUrls: ['./ldlt1.component.css']
})



export class Ldlt1Component implements OnInit {

  @Input() SelectedDdValue: Array<{}>



  //---------get data from server
  getShipType: Type.ResponseShipmentType;
  getCarrierName: Type.ResponseCarrier;
  getStatus: Type.ResponseStatus;
  getVehicleGroup: Type.ResponseVehicleGroup;
  getYesNo: Type.ResponseYesNo;
  getReqEquipments: Type.ResponseReqQequipments;
  getTypePacking: Type.ResponseTypePacking;
  getRoute: Type.ResponseRoute;

  AssignVendorQuota: Type.SendProcessAssignVendorQuota = {
    shipmentId: null,
    planingDatetime: null,
    carrierId: null,
    vehicleGroupId: null,
    shipmentLink: null,
    isStat: null,
    ireqEQP: null,
    isOutside: null,
    shipmentRouteId: null,
    typePackingId: null,
    userId: null
  }

  //-------------------response data to table
  ResProcessSearchCarrierQuota: Type.ResponseProcessSearchCarrierQuota;


  //------------------ return quota (request)
  SendRequestReturnQuota: Type.SendProcessClearandReturnAssignVendorQuota;

  //------------------ response retrun quota
  ResReturnQuota: Type.ResponseProcessClearandReturnAssignVendorQuota;


  sim_ResProSearchCarrierQuota = {
    "shipment_No": null,
    "deliver_No": null,
    "invoice_No:": null,
    "booking_No": null,
    "closing_No": null,
    "mat_No": null,
    "qty": null,
    "truck_load": null,

  }

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

  selectedVehicle: Array<null>;


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
      },
      {
        "shipmenttypeid": 3,
        "code": "Z103",
        "description": "WSS Trk Deliver SSS"
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
        "description": "รถรับเอง",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 2,
        "code": "11",
        "description": "รถ 6 ล้อ",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 3,
        "code": "12",
        "description": "รถ 6 ล้อ NGV",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 4,
        "code": "13",
        "description": "รถ 10 ล้อ คอกสูง",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 5,
        "code": "14",
        "description": "รถ 10 ล้อ ตู้ผ้าใบ",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 6,
        "code": "15",
        "description": "รถ 10 ล้อตู้เปิดข้าง",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 7,
        "code": "16",
        "description": "รถ 10 ล้อพ่วง",
        "isTail": "Y"
      },
      {
        "vehiclegroupid": 8,
        "code": "17",
        "description": "NGV-10 ล้อ คอกสูง",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 9,
        "code": "18",
        "description": "NGV-10 ล้อ ตู้ผ้าใบ",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 10,
        "code": "19",
        "description": "NGV-10 ล้อ เปิดข้าง",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 11,
        "code": "1A",
        "description": "NGV-10 ล้อพ่วง",
        "isTail": "Y"
      },
      {
        "vehiclegroupid": 12,
        "code": "1B",
        "description": "รถธุรการตู้ 6 ล้อ",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 13,
        "code": "1C",
        "description": "รถธุรการตู้ Pick up",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 14,
        "code": "1D",
        "description": "รถ PTTPL",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 15,
        "code": "1E",
        "description": "รถ Bulk (Plas/Pol)",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 16,
        "code": "1F",
        "description": "รถ ISO (Plas/Pol)",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 17,
        "code": "20",
        "description": "รถ 10 ล้อพ่วงตู้ EXP",
        "isTail": "Y"
      },
      {
        "vehiclegroupid": 18,
        "code": "21",
        "description": "เทรลเลอร์ EXP-NGV",
        "isTail": "N"
      },
      {
        "vehiclegroupid": 19,
        "code": "27",
        "description": "รถ 10 ล้อตู้เปิดท้าย",
        "isTail": "N"
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

  init_selected: any;
  ShipType = new FormControl();
  shipment_Type: Array<string>;

  CarrierName = new FormControl();
  Carrier_Name: Array<string>;



  //-------------------------- get selected date
  date_from: string;
  date_to: string;
  planning_date: string;


  type1 = new FormControl();

  shipmentStatus = new FormControl();
  shipment_Status: Array<string>;

  //---------------urgent car | yesno
  UrgentShipment = new FormControl("No");
  Urgent_list: Array<string>;

  //---------------require equipment
  AddTool = new FormControl("-");
  additionalTool: Array<string>;


  //----------------- vehicle group list
  vehicle_Group = new FormControl();
  vehicleGroup_list: Array<string>;

  //---------------- shipment tail list
  shipmentTail = new FormControl();
  shiptail_list: Array<string> = [];


  //---------------- vshiment packer list
  ShipmentPacker = new FormControl("คนงาน");
  PackerList: Array<string>;

  get_route = new FormControl();
  RouteList: Array<string>;


  isOutside = new FormControl("No");

  public transname1: any;



  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information (Sum ของยอดรถรวมที่ผู้ขนส่งแจ้ง - Quota ที่ขนส่งให้):";


  TableHeader = ["No.", "Shipment No.", "Delivery No.", "Invoice No.", "Boking No.", "Closing Time", "Grade", "Qty (Kg)", "Truck Load", "ประเภทรถ", "Shipment (หาง)", "รถตีด่วน", "ต้องการอุปกรณ์", "คนบรรจุสินค้า", "Remark", "Picking At", "Return To", "Route", "รับของข้างนอก", "จำนวนกรรมกรลงสินค้า", "Planning Time", "", ""];

  TableData = {
    "result": [{
      "shipment_No": "SN-88989", "deliveryNum": "DO-87897", "invoiceNum": "IRPC-0909",
      "BookingNum": "BB-023113", "closingTime": "09:10", "grade": "A", "quantity": 60, "truckLoad": 90,
      "shipmentType": "รถสิบล้อ", "shipmentTail": "ipasdfp", "urgentCar": "no",
      "additionalTool": "on Pallet", "packer": "folk-lift", "remark": "KOPPER",
      "pickupAt": "Suratthani", "returnTo": "BKK", "route": "no", "outsidePickup": "no",
      "workerNum": 3, "planningTime": "11.44"
    },

    {
      "shipment_No": "SN-887765", "deliveryNum": "DO-1111", "invoiceNum": "IRPC-11111",
      "BookingNum": "BB-32467", "closingTime": "09:10", "grade": "A", "quantity": 40, "truckLoad": 50,
      "shipmentType": "รถพ่วง", "shipmentTail": "qqqqqqqqq", "urgentCar": "no",
      "additionalTool": "None", "packer": "Bulk", "remark": "KDLLAO",
      "pickupAt": "CNX", "returnTo": "BKK", "route": "no", "outsidePickup": "no",
      "workerNum": 3, "planningTime": "12.44"
    },
    {
      "shipment_No": "SN-878718", "deliveryNum": "DO-1971", "invoiceNum": "IRPC-116123",
      "BookingNum": "BB-32467", "closingTime": "09:10", "grade": "A", "quantity": 40, "truckLoad": 50,
      "shipmentType": "รถสิบล้อ พ่วงข้าง", "shipmentTail": "qqqqqqqqq", "urgentCar": "no",
      "additionalTool": "None", "packer": "Bulk", "remark": "KDLLAO",
      "pickupAt": "CNX", "returnTo": "BKK", "route": "no", "outsidePickup": "no",
      "workerNum": 3, "planningTime": "12.44"
    },

    {
      "shipment_No": "SN-875165", "deliveryNum": "DO-1977", "invoiceNum": "IRPC-116123",
      "BookingNum": "BB-32467", "closingTime": "09:10", "grade": "A", "quantity": 40, "truckLoad": 50,
      "shipmentType": "รถสิบล้อ พ่วงข้าง", "shipmentTail": "qqqqqqqqq", "urgentCar": "no",
      "additionalTool": "None", "packer": "Bulk", "remark": "KDLLAO",
      "pickupAt": "CNX", "returnTo": "BKK", "route": "no", "outsidePickup": "no",
      "workerNum": 3, "planningTime": "12.44"
    },

    ],
    "message": "OK"
  }


  _object = Object;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.date_from = moment().format("YYYY-MM-DDTHH:mm:ss"); //init datetime
    this.date_to = moment().format("YYYY-MM-DDTHH:mm:ss"); //init datetime


    //-------------------------------------------------load init
    this.getShipType = this.sim_shipType as Type.ResponseShipmentType;
    this.getCarrierName = this.sim_carrierName as Type.ResponseCarrier;
    this.getStatus = this.sim_status as Type.ResponseStatus;

    this.ShipType.setValue(this.getShipType.result[0].description);
    this.CarrierName.setValue(this.getCarrierName.result[0].name);
    this.shipmentStatus.setValue(this.getStatus.result[0].name);

    //---------------------init send data
    this.datatoSearch();



    this.getVehicleGroup = this.sim_vehicleGroup as Type.ResponseVehicleGroup;
    this.getYesNo = this.sim_yesno as Type.ResponseYesNo;
    this.getReqEquipments = this.sim_ReqEquip as Type.ResponseReqQequipments;
    this.getTypePacking = this.sim_typePacking as Type.ResponseTypePacking;
    this.getRoute = this.sim_route as Type.ResponseRoute;

    this.createShipTDropDownData();
    this.CreateDropDownList();

    // console.log(this._object);
  }

  //--------------------- get ddl data
  createShipTDropDownData() {
    //-----------------sipmenttype ddl
    if (this.getShipType != undefined) {
      if (this.getShipType.message == "OK") {

        let list_ary = [];
        for (let l = 0; l < this.getShipType.result.length; l++) {
          list_ary[l] = this.getShipType.result[l].description;
          // console.log("i",l,"data ddl:", list_ary);

          // agent_list_ary[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.shipment_Type = list_ary;
        this.createCarrierDropdown()
        // console.log("getdropdoen loop:", this.shipment_Type)
      }
      else {
        console.warn("message NOT OK")
      }
    }

  }

  createCarrierDropdown() {
    //-------------------------------- carrierName ddl
    if (this.getCarrierName != undefined) {
      if (this.getCarrierName.message == "OK") {
        let carrier_list_ary = [];
        for (let l = 0; l < this.getCarrierName.result.length; l++) {
          carrier_list_ary[l] = this.getCarrierName.result[l].name;
        }
        this.Carrier_Name = carrier_list_ary;
        this.createStatusDropDown();
        // console.log("get carrrier ddl OK", this.Carrier_Name)
      } else {
        console.warn("message NOT OK")
      }
    }
  }

  createStatusDropDown() {
    //------------------------------ shipmentStatus ddl
    if (this.getStatus != undefined) {
      if (this.getStatus.message == "OK") {
        let status_list_ary = [];
        for (let l = 0; l < this.getStatus.result.length; l++) {
          status_list_ary[l] = this.getStatus.result[l].name;
        }
        this.shipment_Status = status_list_ary;
        // console.log("get shipmetn states ddl OK", this.shipment_Status)

      } else {
        console.warn("message NOT OK")
      }
    }
  }

  ///-----------get selected date 
  GetDate(get_date, variable) {

    //------ selected date_from
    if (variable == 1) {
      this.date_from = get_date;
    }

    //------ selected date_to
    else if (variable == 2) {
      this.date_to = get_date;
    }
    else if (variable == 3) {
      this.planning_date = get_date;
    }

    // console.log("date from", this.date_from, " date to:", this.date_to, " planning date:", this.planning_date);

  }

  sim_resProcessSerach = new Array();
  //----------- pack data 
  datatoSearch() {

    if (this.ShipType.value == null) {
      // console.warn("null ship value")
      this.sel_shiptype = "null";
    }

    if (this.CarrierName.value == null) {
      // console.warn("null carrier value")
      this.sel_carrierName = "null";
    }

    if (this.ShipType.value != null) {
      this.shipTpyeSelected(this.ShipType.value);
    }

    if (this.CarrierName.value != null) {
      this.carrierNameSelected(this.CarrierName.value);
    }

    //------------define id for status to send
    let status_id;

    if (this.shipmentStatus.value == "Planning") {
      status_id = 2;
      // console.log("status(P)", status_id)
    }

    else if (this.shipmentStatus.value == "Create Shipment") {
      status_id = 1;
      // console.log("status(C)", status_id)
    }

    let sendSearchData: any = {};
    sendSearchData = {

      sel_vehiclegroupId: this.sel_shiptype,
      sel_date_from: this.date_from,
      sel_date_to: this.date_to,
      sel_carrierName: this.sel_carrierName,
      sel_currentstatusid: status_id,

    }

    //-------- api: api/v1/Process/ProcessSearchCarrierQuota?loadDateFrom=2019-11-07T00:00:00&loadDateTo=2019-12-30T00:00:00&shipmenttypeid=1&carrierId=1&vehicleId=1&currentstatusid=1
    console.log("vehicle group ID:", this.sel_shiptype, "date_from:", this.date_from, "date to:", this.date_to,
      "carrier name:", this.sel_carrierName, "current status id:", status_id);

    //-----------sim data
    let sim_resProcessSerach = {
      "result": [],
      "message": "OK"
    }

    // console.log(this.ShipType.value, this.CarrierName.value);
    console.log("pack data: ", sendSearchData);
    console.log("sim", sim_resProcessSerach.message);
    // console.log("date from:", this.date_from, "date to: ", this.date_to);

  }

  //--------define id of shipmenttype for data packing
  sel_shiptype: string;
  shipTpyeSelected(sel) {
    let selected_shipmentID;

    for (let i = 0; i < this.getShipType.result.length; i++) {
      if (this.ShipType.value == this.getShipType.result[i].description) {
        selected_shipmentID = this.getShipType.result[i].shipmenttypeid;
        // sel_shiptype_ary[n] = a;
      }
    }
    console.warn("shipment ID selected:", selected_shipmentID)
    this.sel_shiptype = selected_shipmentID;
    // console.log("selected shipType id: " + sel_shiptype);
  }

  //--------define id of carrierName for data packing
  sel_carrierName: string;
  carrierNameSelected(sel) {
    let selected_carrierName;
    for (let i = 0; i < this.getCarrierName.result.length; i++) {
      if (this.CarrierName.value == this.getCarrierName.result[i].name) {
        selected_carrierName = this.getCarrierName.result[i].carrierid;

      }
    }
    this.sel_carrierName = selected_carrierName;
    console.log("selected carrierName id: " + this.sel_carrierName);

  }

  CreateDropDownList() {

    //------------------------ vehicle group ddl
    if (this.getVehicleGroup != undefined) {
      if (this.getVehicleGroup.message == "OK") {

        let vhcG_list_ary = [];
        for (let l = 0; l < this.getVehicleGroup.result.length; l++) {
          vhcG_list_ary[l] = this.getVehicleGroup.result[l].description;
          // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.vehicleGroup_list = vhcG_list_ary;

      } else {
        console.warn("message NOT OK/ NOT SUCCESS DDL")
      }
    }


    //----------------- require equip ddl
    if (this.getReqEquipments != undefined) {
      if (this.getReqEquipments.message == "OK") {
        let reqEq_list_ary = [];
        for (let l = 0; l < this.getReqEquipments.result.length; l++) {
          reqEq_list_ary[l] = this.getReqEquipments.result[l].name;
          // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.additionalTool = reqEq_list_ary;
      }
      else {
        console.warn("message NOT OK/ NOT SUCCESS DDL")
      }
    }


    //----------------------- yes no ddl
    if (this.getYesNo != undefined) {
      if (this.getYesNo.message == "OK") {
        let yn_list_ary = [];
        for (let l = 0; l < this.getYesNo.result.length; l++) {
          yn_list_ary[l] = this.getYesNo.result[l].name;
          // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.Urgent_list = yn_list_ary;
      }
      else {
        console.warn("message NOT OK/ NOT SUCCESS DDL")
      }
    }


    //------------------- type packing ddl
    if (this.getTypePacking != undefined) {
      if (this.getTypePacking.message == "OK") {
        let typePacking_list_ary = [];
        for (let l = 0; l < this.getTypePacking.result.length; l++) {
          typePacking_list_ary[l] = this.getTypePacking.result[l].name;
          // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.PackerList = typePacking_list_ary;
      }
      else {
        console.warn("message NOT OK/ NOT SUCCESS DDL")
      }
    }


    //--------------- route ddl
    if (this.getRoute != undefined) {
      if (this.getRoute.message == "OK") {
        let route_list_ary = [];
        for (let l = 0; l < this.getRoute.result.length; l++) {
          route_list_ary[l] = this.getRoute.result[l].description;
          // agent_carrier_[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.RouteList = route_list_ary;
      }
      else {
        console.warn("message NOT OK/ NOT SUCCESS DDL")
      }
    }

  }

  selected(Droplist) {
    console.log(Droplist);
    if (Droplist == "Planning") {
      console.log("กดรอ confirm จ้า");
      // this.show = !this.show;
      // this.show1 = false;

      this.show1 = !this.show1;
      this.show = false;

      this.shipdiv1 = false;
      this.shipdiv = true;

    }

    if (Droplist == "Create Shipment") {
      // this.show1 = !this.show1;
      // this.show = false;
      console.log("CREATE DROPDOWN")
      this.CreateDropDownList()

      this.show = !this.show;
      this.show1 = false;

      this.shipdiv1 = true;
      this.shipdiv = false;
    }
  }

  selectedVehicleGroup(sel, i, e) {
    console.log("selected vehicle group", sel, i)

    let sel1;
    for (let j = 0; j < this.getVehicleGroup.result.length; j++) {
      if (sel == this.getVehicleGroup.result[j].description) {
        sel1 = this.getVehicleGroup.result[j].isTail;
        // sel_shiptype_ary[n] = a;
      }
    }
    console.log("selected vehical group:", sel1)
    if (sel1 == "N") {

      this.bt_save[i] = false;

    }
    else {
      console.log("SHOW SHIP DDL")
      this.bt_save[i] = true;
      this.createShipTailList(i)

    }


  }

  createShipTailList(i) {


    for (let j = 0; j < this.TableData.result.length; j++) {

      this.shiptail_list[j] = this.TableData.result[j].shipment_No;


      // this.shiptail_list[j] = this.TableData.result[j].shipment_No;
      // console.log(this.shiptail_list)
    }
    this.shiptail_list.splice(i, 1);
    console.log(this.shiptail_list)



  }

  selectedOption(evt){
    console.log("selectedoption",evt);
  }
  toggleRemark(i) {
    this.remark = !this.remark;
    console.log("toggle Remark" + i);

  }

  disableDropdown(value, i) {

    var num = i;

    console.log(value, i);
    // console.log(this);
    // if (value != "รถพ่วง") {

    //   this.bt_save[num] = false;

    // }
    // else {
    //   this.bt_save[num] = true;

    // }

    if (value == "Domestic") {
      this.route_save = false;
    }

    if (value == "Export") {
      this.route_save = true;
      console.log("load form tBConfig");
    }
    console.log("domestic loop");

  }




  inputEvent(event) {

    // this.dateFrom.date = event;
    // this.getData(this.dateFrom.date);
    console.log("selectedDated");
  }

  sel_vhcGroupID: number;
  sel_urgent_yesnoID: string;
  sel_addtoolID: number;
  sel_typePackID: number;
  sel_routeID: number;
  sel_outsideID: string;

  AssignVendor(j) {
  
    this.getID(this.vehicle_Group.value, this.UrgentShipment.value, this.AddTool.value, this.ShipmentPacker.value, this.get_route.value, this.isOutside.value);
    // this.AssignVendorQuota.shipmentId =  this.TableData[j].shipment_No;
    this.AssignVendorQuota.vehicleGroupId = this.sel_vhcGroupID;
    this.AssignVendorQuota.isStat = this.sel_urgent_yesnoID;
    this.AssignVendorQuota.ireqEQP = this.sel_addtoolID;
    this.AssignVendorQuota.typePackingId = this.sel_typePackID;
    this.AssignVendorQuota.shipmentRouteId = this.sel_routeID;
    this.AssignVendorQuota.isOutside = this.sel_outsideID;
    this.AssignVendorQuota.planingDatetime = this.planning_date;

    console.log("row",j, this.AssignVendorQuota);


    // console.log("assignVendor:", this.sel_vhcGroupID, this.sel_urgent_yesnoID, this.sel_addtoolID, this.sel_typePackID,
    // "get route:", this.sel_routeID, "Outsie id:", this.sel_outsideID)
  }



  searchTable(event) {

    console.log("searchTable llop" + this.searchkeyword.value);

  }

  returnQuota(i) {
    console.log("return quota button: " + i)
  }


  getID(a, b, c, d, gr, os) {
    console.log("get id loop:", a, b, c, d, gr, os)

    //-------------- vehicle group id
    for (let i = 0; i < this.getVehicleGroup.result.length; i++) {
      if (a == this.getVehicleGroup.result[i].description) {
        let b = this.getVehicleGroup.result[i].vehiclegroupid;
        this.sel_vhcGroupID = b;
      }
    }

    //------------------ urgent yesno id
    for (let i = 0; i < this.getYesNo.result.length; i++) {
      if (b == this.getYesNo.result[i].name) {
        let c = this.getYesNo.result[i].code;
        this.sel_urgent_yesnoID = c;
      }

      if (os == this.getYesNo.result[i].name) {
        let oss = this.getYesNo.result[i].code;
        this.sel_outsideID = oss;
      }
    }

    //---------------- additional tool id
    for (let i = 0; i < this.getReqEquipments.result.length; i++) {
      if (c == this.getReqEquipments.result[i].name) {
        let cc = this.getReqEquipments.result[i].reqqequipmentsid;
        this.sel_addtoolID = cc;
      }
    }

    //---------------- shipment packer id
    for (let i = 0; i < this.getTypePacking.result.length; i++) {
      if (d == this.getTypePacking.result[i].name) {
        let dd = this.getTypePacking.result[i].typepackingid;
        this.sel_typePackID = dd;
      }
    }

    //---------------- route id
    for (let i = 0; i < this.getRoute.result.length; i++) {
      if (gr == this.getRoute.result[i].description) {
        let grr = this.getRoute.result[i].routeid;
        this.sel_routeID = grr;
      }
    }


    console.log("get id loop:", this.sel_vhcGroupID, "yesno:", this.sel_urgent_yesnoID,
      "addtool:", this.sel_addtoolID, "typePack: ", this.sel_typePackID,
      "get route:", this.sel_routeID, "outside:", this.sel_outsideID);

  }

}
