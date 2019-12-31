import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormControlName } from '@angular/forms';


import * as Type from 'src/models/VariablesType';
import * as Comp from 'src/models/ComponentClass'
import * as moment from 'moment';

@Component({
  selector: 'app-ldlt11',
  templateUrl: './ldlt11.component.html',
  styleUrls: ['./ldlt11.component.css']
})
export class Ldlt11Component implements OnInit {



  //------------ header of card
  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information (Sum ของยอดรถรวมที่ผู้ขนส่งแจ้ง - Quota ที่ขนส่งให้):";


  AllVehicleOption: Array<Comp.Dropdown> = [];
  SelectedVehicleGroup: Array<Comp.Dropdown> = [];
  AllIsStatOption: Array<Comp.Dropdown> = [];
  SelectedYesNo: Array<Comp.Dropdown> = [];
  AllReqEquipOptions: Array<Comp.Dropdown> = [];
  SelectedReqEquip: Array<Comp.Dropdown> = [];
  AllTypePackingOPtions: Array<Comp.Dropdown> = [];
  SelectedTypePack: Array<Comp.Dropdown> = [];
  AllRouteOption: Array<Comp.Dropdown> = [];
  SelectedRoute: Array<Comp.Dropdown> = [];

  AllShipmentLinkOption: Array<Comp.Dropdown> = [];
  SelectedShipment: Array<Comp.Dropdown> = [];



  //--------------get data for ddl to search

  getShipType: Type.ResponseShipmentType;
  getCarrierName: Type.ResponseCarrier;
  getStatus: Type.ResponseStatus;


  //-----------get data for ddl in table
  getVehicleGroup: Type.ResponseVehicleGroup;
  getReqEquip: Type.ResponseReqQequipments;
  getYesNo: Type.ResponseYesNo;
  getTypePacking: Type.ResponseTypePacking;
  getRoute: Type.ResponseRoute;

  //-----------send to assignQuota  
  //---------  api/v1/Process/ProcessSearchCarrierQuota
  sendProcessAssignQuota: Type.SendProcessAssignVendorQuota = {
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
    userId: null,
  }

  sendAssignQuota: Array<{
    shipmentId: number;
    planingDatetime: string;
    carrierId: number;
    vehicleGroupId: number;
    shipmentLink: string;
    isStat: string;
    ireqEQP: number;
    isOutside: string;
    shipmentRouteId: number;
    typePackingId: number;
    userId: number;
  }> = [null]


  //-----------response to assignQuota
  getResponseAssignQuota: Type.ResponseProcessAssignVendorQuota;

  //------------send to returnQuota
  sendClearandReturnQuota: Type.SendProcessClearandReturnAssignVendorQuota = {
    shipmentId: null,
    carrierId: null,
    userId: null
  }

  //-----------response to return quota
  getResponseClearandReturn: Type.ResponseProcessClearandReturnAssignVendorQuota;


  //-------------------sim data for dataToSearch
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

  //----------------- ddl form control
  ShipType = new FormControl();
  shipmentOption: Array<string>;

  shipmentStatus = new FormControl();
  shipment_Status: Array<string>;

  CarrierName = new FormControl();
  Carrier_Name: Array<string>;

  shipmentLink = new FormControl();



  date_from: string;
  date_to: string;
  date_planning: string;



  sim_ResProcessSearch = {
    "result": [
      {
        "shipment_id": 2,
        "shipment_No": "6101244088",
        "deliver_No": "3030378985",
        "invoice_No": null,
        "booinkg_No": null,
        "closing_time": null,
        "mat_no": "GG3245",
        "qty": null,
        "truck_Load": 2500.0,
        "vehicle_group_desc": null,
        "shipments_link_id": null,
        "isStat": null,
        "req_qequipments": null,
        "type_packing_name": null,
        "remark": null,
        "pick_up_at": null,
        "return_to": null,
        "route_name": null,
        "isOutside": null,
        "total_worker": null,
        "plannig_Datetime": "2019-12-24T23:49:43.337"
      },
      {
        "shipment_id": 3,
        "shipment_No": "6101244099",
        "deliver_No": "3030378986",
        "invoice_No": null,
        "booinkg_No": null,
        "closing_time": null,
        "mat_no": "GG3245",
        "qty": null,
        "truck_Load": 7000.0,
        "vehicle_group_desc": null,
        "shipments_link_id": null,
        "isStat": null,
        "req_qequipments": null,
        "type_packing_name": null,
        "remark": null,
        "pick_up_at": null,
        "return_to": null,
        "route_name": null,
        "isOutside": null,
        "total_worker": null,
        "plannig_Datetime": "2019-12-24T23:44:43.337"
      },
      {
        "shipment_id": 7,
        "shipment_No": "6101244089",
        "deliver_No": "3030378988",
        "invoice_No": null,
        "booinkg_No": null,
        "closing_time": null,
        "mat_no": "2346SXTA2 8D51",
        "qty": null,
        "truck_Load": 7000.0,
        "vehicle_group_desc": null,
        "shipments_link_id": null,
        "isStat": null,
        "req_qequipments": null,
        "type_packing_name": null,
        "remark": null,
        "pick_up_at": null,
        "return_to": null,
        "route_name": null,
        "isOutside": null,
        "total_worker": null,
        "plannig_Datetime": "2019-12-24T23:44:43.337"
      },
      {
        "shipment_id": 7,
        "shipment_No": "6101244089",
        "deliver_No": "3030378989",
        "invoice_No": null,
        "booinkg_No": null,
        "closing_time": null,
        "mat_no": "2386LC 8C66",
        "qty": null,
        "truck_Load": 7000.0,
        "vehicle_group_desc": null,
        "shipments_link_id": null,
        "isStat": null,
        "req_qequipments": null,
        "type_packing_name": null,
        "remark": null,
        "pick_up_at": null,
        "return_to": null,
        "route_name": null,
        "isOutside": null,
        "total_worker": null,
        "plannig_Datetime": "2019-12-24T23:44:43.337"
      },
      {
        "shipment_id": 7,
        "shipment_No": "6101244089",
        "deliver_No": "3030378990",
        "invoice_No": null,
        "booinkg_No": null,
        "closing_time": null,
        "mat_no": "1163RXTA8 F005",
        "qty": null,
        "truck_Load": 7000.0,
        "vehicle_group_desc": null,
        "shipments_link_id": null,
        "isStat": null,
        "req_qequipments": null,
        "type_packing_name": null,
        "remark": null,
        "pick_up_at": null,
        "return_to": null,
        "route_name": null,
        "isOutside": null,
        "total_worker": null,
        "plannig_Datetime": "2019-12-24T23:44:43.337"
      }
    ],
    "message": "OK"
  }


  sim_ResProcessSearch2 = {
    "result": [],
    "message": "NOT OK"
  }

  //------------------api/v1/ProcessCb/VehicleGroup
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

  //-----------------api/v1/ProcessCb/YesNo
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

  //----------------api/v1/ProcessCb/ReqQequipments
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

  //----------------api/v1/ProcessCb/TypePacking
  sim_typePack = {
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

  //----------------api/v1/ProcessCb/Route
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

  //-----------------return ResponseProcessAssignVendorQuota
  sim_ResProcessAssignQuota = {
    "result": null,
    "message": "OK"
  }

  //-----------------return ResponseProcessReturnandClearQuota
  sim_ResProcessReturnQuota = {
    "result": null,
    "message": "OK"
  }

  //----------------filter table
  searchkeyword = new FormControl();
  search1;

  //-------------toggel disable
  bt_save11: Array<boolean> = [false];
  bt_save: Array<boolean> = [true];
  public remark: boolean = false;

  @Input() SelectedDdValue: Array<{}>
  // @Output() bt_save = new EventEmitter();

  constructor() { }

  ngOnInit() {

    this.date_from = moment().format("YYYY-MM-DDTHH:mm:ss");
    this.date_to = moment().format("YYYY-MM-DDTHH:mm:ss");
    this.date_planning = moment().format("YYYY-MM-DDTHH:mm:ss");

    this.getShipType = this.sim_shipType as Type.ResponseShipmentType;
    this.getStatus = this.sim_status as Type.ResponseStatus;
    this.getCarrierName = this.sim_carrier as Type.ResponseCarrier;
    this.CreateShipTypeOption();

    this.ShipType.setValue(this.getShipType.result[0].description);
    this.CarrierName.setValue(this.getCarrierName.result[0].name);
    this.shipmentStatus.setValue(this.getStatus.result[0].name);

    this.datatoSearch();



    //--------------------------- initial sendProcessAssign
    for (let a = 0; a < this.sim_ResProcessSearch.result.length; a++) {
      this.sel_selectedVHD[a] = this.getVehicleGroup.result[0].vehiclegroupid;
      this.sel_yesno_isStat_ary[a] = this.getYesNo.result[1].yesnoid;
      this.sel_req_ary[a] = this.getReqEquip.result[0].reqqequipmentsid;
      this.sel_typePack_ary[a] = this.getTypePacking.result[0].typepackingid;
      this.sel_route_ary[a] = this.getRoute.result[0].routeid;
      this.sel_isOutside_ary[a] = this.getYesNo.result[1].yesnoid;
      this.sel_getDatePlanning[a] = this.date_planning;
      this.bt_save[a] = true;


    }

    console.log(this.sel_selectedVHD);
  }

  datatoSearch() {


    if (this.ShipType.value == null) {
      // console.warn("null ship value")
      this.sel_shiptype = "null";
    }

    if (this.CarrierName.value == null) {
      // console.warn("null carrier value")
      this.sel_carrierID = "null";
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

    //--------- api sendProcessSearchCarrierQuota
    //api/v1/Process/ProcessSearchCarrierQuota?loadDateFrom=2019-11-07T00:00:00&loadDateTo=2019-12-30T00:00:00&shipmenttypeid=1&carrierId=1&currentstatusid=1

    console.log("dateFrom:", this.date_from, "dateTo:", this.date_to, "shipmentID:", this.sel_shiptype, "carrierID:", this.sel_carrierID, "currentStatusID:", status_id);

    this.getVehicleGroup = this.sim_vehicleGroup as Type.ResponseVehicleGroup;
    this.CreateVehicleGroupOption();
    this.getYesNo = this.sim_yesno as Type.ResponseYesNo;
    this.CreateYesNoOption();
    this.getReqEquip = this.sim_ReqEquip as Type.ResponseReqQequipments;
    this.CreateReqEquipOption();
    this.getTypePacking = this.sim_typePack as Type.ResponseTypePacking;
    this.CreateTypePackingOption();
    this.getRoute = this.sim_route as Type.ResponseRoute;
    this.CreateRouteOption();


  }



  GetDate(get_date, n) {
    if (n == "1") {
      this.date_from = get_date;
      console.log("date from:", get_date);
    }

    if (n == "2") {
      this.date_to = get_date;
      console.log("date to:", get_date);
    }

  }

  CreateShipTypeOption() {
    if (this.getShipType != undefined) {
      if (this.getShipType.message == "OK") {

        let list_ary = [];
        for (let l = 0; l < this.getShipType.result.length; l++) {
          list_ary[l] = this.getShipType.result[l].description;
          // console.log("i",l,"data ddl:", list_ary);

          // agent_list_ary[l] = "{name:" + this.getPlantNum.result[l].name + ",id:" + this.getPlantNum.result[l].id + "}";
        }
        this.shipmentOption = list_ary;
        this.CreateCarrierOption()
        // console.log("getdropdoen loop:", this.shipmentOption)
      }
      else {
        console.warn("message NOT OK")
      }
    }
  }

  CreateCarrierOption() {
    if (this.getCarrierName != undefined) {
      if (this.getCarrierName.message == "OK") {
        let carrier_list_ary = [];
        for (let l = 0; l < this.getCarrierName.result.length; l++) {
          carrier_list_ary[l] = this.getCarrierName.result[l].name;
        }
        this.Carrier_Name = carrier_list_ary;
        this.CreateStatusDropDown();
        // console.log("get carrrier ddl OK", this.Carrier_Name)
      } else {
        console.warn("message NOT OK")
      }
    }

  }

  CreateStatusDropDown() {
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

  sel_getDatePlanning = new Array(this.sim_ResProcessSearch.result.length);

  GetDatePlanning(get_date, i) {
    this.date_planning = get_date;
    console.log("date planning:", get_date, "row:", i);
    this.sel_getDatePlanning[i] = get_date;
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
    this.sel_shiptype = selected_shipmentID;
    // console.log("selected shipType id: " + sel_shiptype);
  }

  //--------define id of carrierName for data packing
  sel_carrierID: string;
  carrierNameSelected(sel) {
    let selected_carrierName;
    for (let i = 0; i < this.getCarrierName.result.length; i++) {
      if (this.CarrierName.value == this.getCarrierName.result[i].name) {
        selected_carrierName = this.getCarrierName.result[i].carrierid;

      }
    }
    this.sel_carrierID = selected_carrierName;
    console.log("selected carrierName id: " + this.sel_carrierID);

  }



  //----------------------- table DDL
  CreateVehicleGroupOption() {
    for (let a = 0; a < this.getVehicleGroup.result.length; a++) {
      this.AllVehicleOption[a] = {
        id: this.getVehicleGroup.result[a].vehiclegroupid,
        name: this.getVehicleGroup.result[a].description,
      }
    }
    for (let a = 0; a < this.sim_ResProcessSearch.result.length; a++) {
      this.SelectedVehicleGroupOption(a);

    }
  }



  sel_selectedVHD = new Array(this.sim_ResProcessSearch.result.length);
  new_options: Array<{
    shipment_id: number;
    shipment_No: string
  }> = [];


  SelectedVHC(sel, i) {

    // this.CreateShipmentLinkOption()

    console.log("selected VHC:", sel, i)

    let sel1;
    for (let j = 0; j < this.getVehicleGroup.result.length; j++) {
      if (sel.selectedId == this.getVehicleGroup.result[j].vehiclegroupid) {
        sel1 = this.getVehicleGroup.result[j].isTail;
      }
    }

    if (sel1 == "Y") {
      console.log("yes tail")
      this.bt_save[sel.rowIndex] = false;
      this.CreateShipmentLinkOption(sel.rowIndex);

      // let new_options: Array<{
      //   shipment_id: number;
      //   shipment_No: string
      // }> = [];

      // let all_options = this.sim_ResProcessSearch.result;
      // console.log(this.sim_ResProcessSearch.result.length)

      // let a = all_options.filter(e => e.shipment_id != this.sim_ResProcessSearch.result[sel.rowIndex].shipment_id)


      // for (let j = 0; j < a.length; j++) {
      //   let obj: any = {};
      //   obj = {
      //     shipment_id: a[j].shipment_id,
      //     shipment_No: a[j].shipment_No
      //   };
      //   this.new_options.push(obj);
      // }
      // console.log("new option for row:", i, this.new_options)

      // for (let b = 0; b < a.length; b++) {

      //   console.log(this.new_options[b]);
      //   this.AllShipmentLinkOption[b] = {
      //     id: this.new_options[b].shipment_id,
      //     name: this.new_options[b].shipment_No
      //   }
      // }

      // console.log("create allshipmentlink", this.AllShipmentLinkOption)

    }
    else {
      this.bt_save[i] = true;
      this.sel_shipLink_ary[sel.rowIndex] = "null";
      console.log(this.sel_shipLink_ary)
    }

  }

  shipLinkOption: Array<{
    shipment_id: number;
    shipment_No: string
  }> = [];

  CreateShipmentLinkOption(i) {


    for (let a = 0; a < this.sim_ResProcessSearch.result.length; a++) {
      let alll_options = this.sim_ResProcessSearch.result;
      let linkoption = alll_options.filter(e => e.shipment_id != this.sim_ResProcessSearch.result[a].shipment_id)

      console.log("create optionss shipment link", linkoption)

    }

    for (let j = 0; j < this.sim_ResProcessSearch.result.length; j++) {
      this.shipLinkOption[j] = {
        shipment_No: this.sim_ResProcessSearch.result[j].shipment_No,
        shipment_id: this.sim_ResProcessSearch.result[j].shipment_id
      }
    }
    this.shipLinkOption.splice(i, 1);
    console.log(this.shipLinkOption)

  }

  sel_shipLink_ary = new Array(this.sim_ResProcessSearch.result.length);
  selectedShipLink(evt, i) {

    this.sel_shipLink_ary[i] = evt.value.shipment_id;
    console.log("selected shiplink", evt, i, "assign form selected:", this.sel_shipLink_ary)

  }

  //----------------------- initial selected for vehicle group ddl
  SelectedVehicleGroupOption(i: number) {
    this.SelectedVehicleGroup[i] = {
      id: this.getVehicleGroup.result[0].vehiclegroupid,
      name: this.getVehicleGroup.result[0].description
    }
  }

  CreateYesNoOption() {
    for (let a = 0; a < this.getYesNo.result.length; a++) {
      this.AllIsStatOption[a] = {
        id: this.getYesNo.result[a].yesnoid,
        name: this.getYesNo.result[a].name,
      }

    }

    for (let i = 0; i < this.sim_ResProcessSearch.result.length; i++) {
      this.SelectedYesNo[i] = {
        id: this.getYesNo.result[1].yesnoid,
        name: this.getYesNo.result[1].name
      }
    }

  }

  CreateReqEquipOption() {
    for (let a = 0; a < this.getReqEquip.result.length; a++) {
      this.AllReqEquipOptions[a] = {
        id: this.getReqEquip.result[a].reqqequipmentsid,
        name: this.getReqEquip.result[a].name,
      }
    }

    for (let i = 0; i < this.sim_ResProcessSearch.result.length; i++) {
      this.SelectedReqEquip[i] = {
        id: this.getReqEquip.result[0].reqqequipmentsid,
        name: this.getReqEquip.result[0].name,
      }
    }

  }

  CreateTypePackingOption() {

    for (let a = 0; a < this.getTypePacking.result.length; a++) {
      this.AllTypePackingOPtions[a] = {
        id: this.getTypePacking.result[a].typepackingid,
        name: this.getTypePacking.result[a].name,
      }
    }

    for (let i = 0; i < this.sim_ResProcessSearch.result.length; i++) {
      this.SelectedTypePack[i] = {
        id: this.getTypePacking.result[0].typepackingid,
        name: this.getTypePacking.result[0].name,
      }
    }

  }

  CreateRouteOption() {
    for (let a = 0; a < this.getRoute.result.length; a++) {
      this.AllRouteOption[a] = {
        id: this.getRoute.result[a].routeid,
        name: this.getRoute.result[a].description,
      }
    }

    for (let i = 0; i < this.sim_ResProcessSearch.result.length; i++) {
      this.SelectedRoute[i] = {
        id: this.getRoute.result[0].routeid,
        name: this.getRoute.result[0].description,
      }
    }
  }


  sel_yesno_isStat_ary = new Array(this.sim_ResProcessSearch.result.length);
  sel_req_ary = new Array(this.sim_ResProcessSearch.result.length);
  sel_typePack_ary = new Array(this.sim_ResProcessSearch.result.length);
  sel_route_ary = new Array(this.sim_ResProcessSearch.result.length);
  sel_isOutside_ary = new Array(this.sim_ResProcessSearch.result.length);
  SelectedToSearch(evt) {
    console.log(evt)

    if (evt.dropdownName == "vehicleGroup") {
      console.log("vehicle group id", evt.selectedId, "row:", evt.rowIndex);
      this.sel_selectedVHD[evt.rowIndex] = evt.selectedId;
      console.log("selected to serach", this.sel_selectedVHD)
    }

    else if (evt.dropdownName == "UrgentCar") {

      this.sel_yesno_isStat_ary[evt.rowIndex] = evt.selectedId;
      console.log("UrgentCar yesno id", evt.selectedId, "row:", evt.rowIndex);
      console.log("selected to serach", this.sel_yesno_isStat_ary)

    }

    else if (evt.dropdownName == "ReqEquip") {
      this.sel_req_ary[evt.rowIndex] = evt.selectedId;
      console.log("ReqEquip id", evt.selectedId, "row:", evt.rowIndex);
      console.log("selected to serach", this.sel_req_ary)

    }

    else if (evt.dropdownName == "TypePacking") {
      this.sel_typePack_ary[evt.rowIndex] = evt.selectedId;
      console.log("TypePacking id", evt.selectedId, "row:", evt.rowIndex);
    }

    else if (evt.dropdownName == "route") {
      this.sel_route_ary[evt.rowIndex] = evt.selectedId;
      console.log("route id", evt.selectedId, "row:", evt.rowIndex);
    }

    else if (evt.dropdownName == "isOutside") {
      this.sel_isOutside_ary[evt.rowIndex] = evt.selectedId;
      console.log("isOutside id", evt.selectedId, "row:", evt.rowIndex);
    }


  }

  toggleRemark(i) {
    this.remark = !this.remark;
    console.log("toggle Remark" + i);

  }

  AssignVendor(i) {
    console.log("assi vendor", i)

    this.sendProcessAssignQuota.carrierId = parseInt(this.sel_carrierID);
    this.sendProcessAssignQuota.shipmentId = this.sim_ResProcessSearch.result[i].shipment_id;
    this.sendProcessAssignQuota.vehicleGroupId = this.sel_selectedVHD[i];
    this.sendProcessAssignQuota.isStat = this.sel_yesno_isStat_ary[i];
    this.sendProcessAssignQuota.ireqEQP = this.sel_req_ary[i];
    this.sendProcessAssignQuota.typePackingId = this.sel_typePack_ary[i];
    this.sendProcessAssignQuota.shipmentRouteId = this.sel_route_ary[i];
    this.sendProcessAssignQuota.isOutside = this.sel_isOutside_ary[i];
    this.sendProcessAssignQuota.planingDatetime = this.sel_getDatePlanning[i];
    this.sendProcessAssignQuota.shipmentLink = this.sel_shipLink_ary[i];
    console.log("assign loop:", this.sendProcessAssignQuota)
    // this.sendProcessAssignQuota.vehicleGroupId = this.SelectedVehicleGroup[i].id;

    this.ResponseProcessAssignQuota();

  }

  ResponseProcessAssignQuota() {

    this.getResponseAssignQuota = this.sim_ResProcessAssignQuota as Type.ResponseProcessAssignVendorQuota;

    if (this.getResponseAssignQuota.message == "OK") {
      alert("Assign Quota Success");
      console.log("send DatatoSearch to server again")
      this.datatoSearch();
    }
    else {
      alert("Assign Quota Not Success");
    }

  }

  returnQuota(i) {
    // console.log(this.sim_ResProcessSearch.result)

    this.sendClearandReturnQuota.carrierId = parseInt(this.sel_carrierID);
    this.sendClearandReturnQuota.shipmentId = this.sim_ResProcessSearch.result[i].shipment_id;

    console.log(this.sendClearandReturnQuota)
    console.log("Carrier ID", parseInt(this.sel_carrierID), "Selected Shipment ID:", this.sim_ResProcessSearch.result[i].shipment_id)

    this.ResponseProcessReturnAndClearQuota();

  }

  ResponseProcessReturnAndClearQuota() {

    this.getResponseClearandReturn = this.sim_ResProcessReturnQuota as Type.ResponseProcessClearandReturnAssignVendorQuota;
    if (this.getResponseClearandReturn.message == "OK") {
      alert("Return Quota Success");
      console.log("send DatatoSearch to server again")
      this.datatoSearch();
    }
    else {
      alert("Return Quota Not Success");
    }
  }

}
