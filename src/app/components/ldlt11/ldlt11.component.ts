import { Component, OnInit, ElementRef, Input } from '@angular/core';
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

  AllAgentOptions: Array<Comp.Dropdown> = [];
  SelectedAgent: Array<Comp.Dropdown> = [];
  AllVehicleOption: Array<Comp.Dropdown> = [];
  SelectedVehicleGroup: Array<Comp.Dropdown> = [];


  //-----------get data
  getShipType: Type.ResponseShipmentType;
  getVehicleGroup: Type.ResponseVehicleGroup;


  getStatus: Type.ResponseStatus;

  //-------------------sim data
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
  shipmentStatus = new FormControl();
  shipment_Status: Array<string>;

  //---------  api/v1/Process/ProcessSearchCarrierQuota

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


  @Input() SelectedDdValue: Array<{}>

  constructor() { }

  ngOnInit() {

    this.getShipType = this.sim_shipType as Type.ResponseShipmentType;
    this.getStatus = this.sim_status as Type.ResponseStatus;
    this.CreateStatusDropDown();
    this.CreateAgentOptions();

    this.getVehicleGroup = this.sim_vehicleGroup as Type.ResponseVehicleGroup;
    this.CreateVehicleGroupOption();


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


  
  CreateAgentOptions() {
    for (let a = 0; a < this.getShipType.result.length; a++) {
      this.AllAgentOptions[a] = {
        id: this.getShipType.result[a].shipmenttypeid,
        name: this.getShipType.result[a].description,
      }
    }
    // console.log("--create all agent options--", this.AllAgentOptions);
  }

//----------------------- table DDL
  CreateVehicleGroupOption() {
    for (let a = 0; a < this.getVehicleGroup.result.length; a++) {
      this.AllVehicleOption[a] = {
        id: this.getVehicleGroup.result[a].vehiclegroupid,
        name: this.getVehicleGroup.result[a].description,
      }
    }
    console.log(this.AllVehicleOption)
    // this.SelectedVehicleGroupOption(0);

  }

  // SelectedVehicleGroupOption(i: number) {
  //   console.log("selectedVHC", i)
  //   this.SelectedVehicleGroup[i] = {
  //     id: this.getVehicleGroup.result[i].vehiclegroupid,
  //     name: this.getVehicleGroup.result[i].description
  //   }
  // }

  // AllDropdownChange(alll) {
  //   console.log(alll.dropdownName, alll.rowIndex, alll.selectedId);

  // }

  SelectedToSearch(evt) {
    console.log(evt)
  }

}
