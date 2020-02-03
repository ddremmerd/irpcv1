import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import { format } from 'util';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as Type from 'src/models/VariablesType';


@Component({
  selector: 'app-ldlt5',
  templateUrl: './ldlt5.component.html',
  styleUrls: ['./ldlt5.component.css']
})
export class Ldlt5Component implements OnInit {

  content_header_name = "ระบบติดตาม GPS Tracking";

  //------------------get ddl api
  //----------------api/v1/ProcessCb/ShipmentType
  getShipmentType: Type.ResponseShipmentType;

  //---------------api/v1/ProcessCb/Carrier
  getCarrier: Type.ResponseCarrier;

  //---------------api/v1/Process/ProcessTruckTracking
  getResProTruckTrack: Type.ResponseProcessTruckTracking;


  ShipType = new FormControl();
  shipTypeList: Array<string>;

  ShipType2 = new FormControl();

  transportName = new FormControl();
  transNameList: Array<string>;

  tranStatus = new FormControl();
  tranStatusList = [
    { "value": "1|2|3|4", "show": "รถขาเข้าโรงงาน" },
    { "value": "5|6|7|8", "show": "รถขาออกโรงงาน" }];

  shipNum = new FormControl();
  licenseNum = new FormControl();

  //------------parameter for api to send
  sel_shipType;
  sel_Carrier;
  sel_Status;
  ship_num;
  license_num;


  //------------------sim data for ddl
  sim_ShipType = {
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
        "description": "WMS Trk Own Pickup"
      },
      {
        "shipmenttypeid": 4,
        "code": "Z303",
        "description": "Trk Own Pickup"
      },
      {
        "shipmenttypeid": 5,
        "code": "Z305",
        "description": "Trk Return"
      }
    ],
    "message": "OK"
  }

  sim_Carrier = {
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
        "code": "111948",
        "name": "บริษัท ตะวันรุ่ง ทรานส์ จำกัด"
      },
      {
        "carrierid": 4,
        "code": "102967",
        "name": "บริษัทพี ทรานส์ จำกัด"
      },
      {
        "carrierid": 5,
        "code": "111355",
        "name": "บริษัท ศุภทัศนา จำกัด"
      },
      {
        "carrierid": 6,
        "code": "111947",
        "name": "บริษัท อินเตอร์ ทรานสปอร์ต  แอนด์ โลจิสติกส์ จำกัด"
      },
      {
        "carrierid": 7,
        "code": "109852",
        "name": "บริษัท อินเทล โลจิสติคส์ จำกัด"
      },
      {
        "carrierid": 8,
        "code": "113023",
        "name": "บริษัท เอสซีจี โลจิสติกส์ แมเนจเม้นท์ จำกัด"
      },
      {
        "carrierid": 9,
        "code": "106176",
        "name": "บริษัทเอส เอ็ม ซี โลจิสติกส์ จำกัด"
      },
      {
        "carrierid": 10,
        "code": "111946",
        "name": "หจก.พรอำพล ทรานสปอร์ต"
      }
    ],
    "message": "OK"
  }


  //-------------------sim get response table
  sim_ResProTruckTrack = {
    "result": [
      {
        "no": 1,
        "shipment_no": "6102160371",
        "driver": "สมศักดิ์ อำไพ",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": "2020-01-09T11:26:16.613",
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      },
      {
        "no": 2,
        "shipment_no": "6666666666666",
        "driver": "สิริพร อำไพพง",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": "2020-01-04T20:07:31.537",
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      },
      {
        "no": 3,
        "shipment_no": "777777777777",
        "driver": "ศิริพงศ์",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": null,
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      },
      {
        "no": 4,
        "shipment_no": "777777777777",
        "driver": "ศิริพงศ์",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": null,
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      },
      {
        "no": 5,
        "shipment_no": "88888888888888888888",
        "driver": "ศิริพงศ์",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": null,
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      },
      {
        "no": 6,
        "shipment_no": "222222222222222",
        "driver": "ศิริพงศ์",
        "vehicle": "703206สค",
        "carrier_name": "บริษัท จีซี โลจิสติกส์  โซลูชั่นส์ จำกัด",
        "vehicle_status_id": 1,
        "vehicle_status_name": "กำลังเดินทางมาโรงงาน",
        "travel_in_time": "2020-01-09T11:26:16.613",
        "truck_in_area": null,
        "truck_register_time": "2020-01-04T20:07:31.537",
        "truck_out_area": null,
        "truck_arrived_feed": null,
        "truck_to_customer": null,
        "truck_in_late": "2020-01-09T11:26:14.513",
        "truck_out_late": null,
        "cur_lat": "13.089185",
        "cur_long": "100.995500",
        "speed": "6",
        "engine_status": "1",
        "gmap_link": "https://www.google.co.th/maps/dir/13.089185,100.995500/12.662513,101.305736/@13.089185,100.995500,15z/data=!3m1!4b1!4m2!4m1!3e0?hl=en\"  'route ?hl=en"
      }
    ],
    "message": "OK"
  }




  TableHeader = ["Shipment No.", "สถานะรถ", "ผู้ขนส่ง", "ทะเบียนรถ", "ชื่อสกุล", "รถเข้าโซนโรงงาน", "รถเข้าโรงงาน", "รถออก",
    "รถถึง Feed", "รถถึงลูกค้า", "รถเข้าสาย", "รถถึงลูกค้าสาย"];

  TableData = [
    {
      shipNum: "ADSAD1212", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "ADSAD1212", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "AAAA222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "BBBB223232", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },

    {
      shipNum: "CCCCC222222", carStatus: "LEAVING", transName: "KERRY", carLicense: "รย 98724",
      workName: "นายกระจอก งอกง่อย", departTime: "19:30", feedTime: "20:30", arriveCus: "22:30",
      estTime: "3"
    },
  ];

  //-------------------- array to display date and time
  date_truck_in_area = [];
  time_truck_in_area = [];
  date_truck_regist = [];
  time_truck_regist = [];
  date_truck_outArea = [];
  time_truck_outArea = [];
  date_truck_feed = [];
  time_truck_feed = [];
  date_truck_toCus = [];
  time_truck_toCus = [];
  date_truck_late = [];
  time_truck_late = [];
  date_truck_olate = [];
  time_truck_olate = [];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.getShipmentType = this.sim_ShipType as Type.ResponseShipmentType;
    this.getCarrier = this.sim_Carrier as Type.ResponseCarrier;

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  datatoSearch() {

    if (this.ShipType2.value != null) {
      if (this.ShipType2.value.length > 1) {
        this.sel_shipType = this.ShipType2.value.toString().replace(/,/g, '|');
        // console.log(sel_shipType);
      }
      else {
        this.sel_shipType = this.ShipType2.value;
      }
    }
    else {
      this.sel_shipType = "null";
    }

    if (this.transportName.value != null) {
      if (this.transportName.value.length > 1) {
        this.sel_Carrier = this.transportName.value.toString().replace(/,/g, '|');
        // console.log(sel_Carrier);
      }
      else {
        this.sel_Carrier = this.transportName.value;
      }
    }
    else {
      this.sel_Carrier = "null";
    }

    if (this.tranStatus.value != null) {
      if (this.tranStatus.value.length > 1) {
        this.sel_Carrier = this.tranStatus.value.toString().replace(/,/g, '|');
        // console.log(sel_Carrier);
      }
      else {
        this.sel_Status = this.tranStatus.value.toString();
      }
    }
    else {
      this.sel_Status = "null";
    }

    if (this.shipNum.value != null) {
      this.ship_num = this.shipNum.value;
    }
    else {
      this.ship_num = "null";
    }

    if (this.licenseNum.value != null) {
      this.license_num = this.licenseNum.value;
    }
    else {
      this.license_num = "null";
    }



    console.log("shipmentType:", this.sel_shipType, "carrier:", this.sel_Carrier, "status:", this.sel_Status);

    //-------------------api/v1/Process/ProcessTruckTracking?shipmentTypeId=1|2|3&carrierId=1|2&currentStatusId=1|2|3|4&shipmentNo=6102160368&vehicleLicense
    if (this.shipNum.value != null || this.licenseNum.value != null) {

      console.log("shipNO:", this.ship_num, "licenseNo:", this.license_num);
    }

    //---------no shipmentNum && no vehicle_num
    //---------api/v1/Process/ProcessTruckTracking?shipmentTypeId=1|2|3&carrierId=1|2&currentStatusId=1|2|3|4
    if (this.shipNum.value == null && this.licenseNum.value == null) {
      // let sel_shipNo, sel_licenseNo = "";
      // console.log("NO SHIPNUM & VHCNUM", sel_shipNo, sel_licenseNo);
      console.log("NO SHIPNUM & VHCNUM", this.ship_num, this.license_num);
    }

    this.getResProTruckTrack = this.sim_ResProTruckTrack as Type.ResponseProcessTruckTracking;
    if (this.getResProTruckTrack.message == 'OK') {
      this.displayDateTime();
    }

  }

  displayDateTime() {
    for (let i = 0; i < this.getResProTruckTrack.result.length; i++) {

      // let dt_truck_in_area = this.getResProTruckTrack.result[i].truck_in_area;
      if (this.getResProTruckTrack.result[i].truck_in_area != null) {
        let dt_truck_in_area = this.getResProTruckTrack.result[i].truck_in_area.toString().split("T");
        this.date_truck_in_area[i] = dt_truck_in_area[0];
        this.time_truck_in_area[i] = dt_truck_in_area[1];

      }
      else {
        this.date_truck_in_area[i] = "";
        this.time_truck_in_area[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_register_time != null) {
        let dt_truck_regist = this.getResProTruckTrack.result[i].truck_register_time.toString().split("T");
        this.date_truck_regist[i] = dt_truck_regist[0];
        this.time_truck_regist[i] = dt_truck_regist[1];

      }
      else {
        this.date_truck_regist[i] = "";
        this.time_truck_regist[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_out_area != null) {
        let dt_truck_out = this.getResProTruckTrack.result[i].truck_out_area.toString().split("T");
        this.date_truck_outArea[i] = dt_truck_out[0];
        this.time_truck_outArea[i] = dt_truck_out[1];

      }
      else {
        this.date_truck_outArea[i] = "";
        this.time_truck_outArea[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_arrived_feed != null) {
        let dt_truck_feed = this.getResProTruckTrack.result[i].truck_arrived_feed.toString().split("T");
        this.date_truck_feed[i] = dt_truck_feed[0];
        this.time_truck_feed[i] = dt_truck_feed[1];

      }
      else {
        this.date_truck_feed[i] = "";
        this.time_truck_feed[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_to_customer != null) {
        let dt_truck_cus = this.getResProTruckTrack.result[i].truck_to_customer.toString().split("T");
        this.date_truck_toCus[i] = dt_truck_cus[0];
        this.time_truck_toCus[i] = dt_truck_cus[1];

      }
      else {
        this.date_truck_toCus[i] = "";
        this.time_truck_toCus[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_in_area != null) {
        let dt_truck_late = this.getResProTruckTrack.result[i].truck_in_area.toString().split("T");
        this.date_truck_late[i] = dt_truck_late[0];
        this.time_truck_late[i] = dt_truck_late[1];

      }
      else {
        this.date_truck_late[i] = "";
        this.time_truck_late[i] = "";
      }

      if (this.getResProTruckTrack.result[i].truck_out_late != null) {
        let dt_truck_outLa = this.getResProTruckTrack.result[i].truck_out_late.toString().split("T");
        this.date_truck_olate[i] = dt_truck_outLa[0];
        this.time_truck_olate[i] = dt_truck_outLa[1];

      }
      else {
        this.date_truck_olate[i] = "";
        this.time_truck_olate[i] = "";
      }

    }
  }

  showLocation(i, rowNo) {
    console.log("CLICK AT ROW:", i, rowNo)
  }

}
