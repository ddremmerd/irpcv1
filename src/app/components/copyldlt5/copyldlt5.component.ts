import { Component, OnInit, ElementRef } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent, MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormControl, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Type from 'src/models/VariablesType';

@Component({
  selector: 'app-copyldlt5',
  templateUrl: './copyldlt5.component.html',
  styleUrls: ['./copyldlt5.component.css']
})
export class Copyldlt5Component implements OnInit {
  content_header_name = "ระบบติดตาม GPS Tracking -------COPY";

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

  //------------------mat table
  displayedColumns = ["nRow", "shipNum", "carStatus", "carrier", "carLicense",
    "driverName", "carInFacZone", "carInFac", "carDepart", "carArriveFeed", "carArrivCus",
    "carInLate", "carArriveLate"];
  dataSource: MatTableDataSource<UserData>;



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

 

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit() {

    this.getShipmentType = this.sim_ShipType as Type.ResponseShipmentType;
    this.getCarrier = this.sim_Carrier as Type.ResponseCarrier;

  
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
    const users: UserData[] = [];
    for (let i = 0; i < this.getResProTruckTrack.result.length; i++) {
      users.push(createNewRow(i, this.getResProTruckTrack.result[i]));
    }
    this.dataSource = new MatTableDataSource(users);
    console.log("^^^^^^^^CREATE DATASOURCE", this.dataSource)

  }

  showLocation(i) {
    console.log("CLICK AT ROW:", i)
  }

}

function createNewRow(j: number, data): UserData {

  let infacShow, regShow, depShow, feedShow, arrCusShow, inLateShow, OutlateShow;
  if (data.truck_in_area != null) {
    let infac = data.truck_in_area.split("T");
    let infac1 = infac[1].split(":");
    infacShow = infac[0] + "\n" + infac1[0] + ":" + infac1[1];
  }
  else {
    infacShow = "";
  }

  if (data.truck_register_time != null) {
    let reg = data.truck_register_time.split("T");
    let reg1 = reg[1].split(":");
    regShow = reg[0] + "\n" + reg1[0] + ":" + reg1[1];
  }
  else {
    regShow = "";
  }

  if (data.truck_out_area != null) {
    let depart = data.truck_out_area.split("T");
    let depart1 = depart[1].split(":");
    depShow = depart[0] + "\n" + depart1[0] + ":" + depart1[1];

  }
  else {
    depShow = "";
  }

  if (data.truck_in_area != null) {


    let arrivefeed = data.truck_in_area.split("T");
    let arrivefeed1 = arrivefeed[1].split(":");
    feedShow = arrivefeed[0] + "\n" + arrivefeed1[0] + ":" + arrivefeed1[1];

  }
  else {

    feedShow = "";

  }

  if (data.truck_to_customer != null) {
    let arrcus = data.truck_to_customer.split("T");
    let arrcus1 = arrcus[1].split(":");
    arrCusShow = arrcus[0] + "\n" + arrcus1[0] + ":" + arrcus1[1];

  }
  else {

    arrCusShow = "";

  }

  if (data.truck_in_late != null) {
    let late = data.truck_in_late.split("T");
    let late1 = late[1].split(":");
    inLateShow = late[0] + "\n" + late1[0] + ":" + late1[1];

  }
  else {
    inLateShow = "";
  }

  if (data.truck_out_late != null) {
    let outLate = data.truck_out_late.split("T");
    let outLate1 = outLate[1].split(":");
    OutlateShow = outLate[0] + "\n" + outLate1[0] + ":" + outLate1[1];

  }
  else {
    OutlateShow = "";
  }














  return {

    nRow: j + 1,
    shipNum: data.shipment_no,
    carStatus: data.vehicle_status_name,
    carrier: data.carrier_name,
    carLicense: data.vehicle,
    driverName: data.driver,
    carInFacZone: infacShow,
    carInFac: regShow,
    carDepart: depShow,
    carArriveFeed: feedShow,
    carArrivCus: arrCusShow,
    carInLate: inLateShow,
    carArriveLate: OutlateShow

  }
}

//------------------เพิ่ม ส่วนฟังชั่นทำ mat table

export interface UserData {
  nRow: number
  shipNum: string
  carStatus: string
  carrier: string
  carLicense: string
  driverName: string
  carInFacZone: string
  carInFac: string
  carDepart: string
  carArriveFeed: string
  carArrivCus: string
  carInLate: string
  carArriveLate: string
}