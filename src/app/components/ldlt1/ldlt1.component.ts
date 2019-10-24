import { Component, OnInit } from '@angular/core';
export interface prodPacker{
  value: string;
  viewValue: string;
}

export interface addTool{
  value: string;
  viewValue: string;
}

export interface cartype{
  value: string;
  viewValue: string;
}




@Component({
  selector: 'app-ldlt1',
  templateUrl: './ldlt1.component.html',
  styleUrls: ['./ldlt1.component.css']
})



export class Ldlt1Component implements OnInit {

  public show:boolean = false;
  public show1:boolean = false;
  public remark:boolean = false;
  public disableShip: boolean = true;
  public car:string;

  content_header_name = "กำหนดโควตาผู้ขนส่ง";
  content_header_name2 = "Information";


  ListHeader1 = "ประเภทงาน: ";
  ListHeader2 = "ผู้ขนส่ง: ";
  ListHeader3 = "สถานะ: ";
  

  shipment_Type = ["Local", "Export"];
  transportor_Name = ["ตะวันรุ่ง ทรานส์", "KEERY xpress", "TRUCK 999"];
  shipment_Status = ["รอแผนกขนส่งลง Planning", "รอผู้ขนส่ง confirm"];

  TableHeader = ["No.", "Shipment No.", "Delivery No.", "Invoice No.", "Boking No.", "Closing Time", "Grade", "Qty (Kg)", "Truck Load", "ประเภทรถ", "Shipment (หาง)", "รถตีด่วน", "ต้องการอุปกรณ์", "คนบรรจุสินค้า", "Remark", "Picking At","Return To", "Route", "รับของข้างนอก", "จำนวนกรรมกรลงสินค้า", "Planning Time", "",""];

  TableData = [
    {check: true, shipmentNum: "6asfdasf", 
    DONum: "DO-87897", Remark: true, wh_no: 41, 
    shimentType: true, shipmentTail: true, planningTime: "11.44"},

    {check: true, shipmentNum: "99SDAFFSAD", 
    DONum: "DO-1111", Remark: true, wh_no: 41, 
    shimentType: true, shipmentTail: true, planningTime: "12.44"}
  ];


  cartype: cartype[] =[
    {value: "รถพ่วง", viewValue: "รถพ่วง"},
    {value: "รถสิบล้อ", viewValue: "รถสิบล้อ"}
  ];


  productPacker: prodPacker[] = [
    {value: "default", viewValue: "ใช้คนงาน"} ,
    {value: "fork lift", viewValue: "ใช้ Forklift"},
    {value: "sea bulk", viewValue: "Sea Bulk"},
    {value: "bulk truck", viewValue: "Bulk Truck"}
  ];

  additionalTool: addTool[] = [
    {value: "no", viewValue: "-"}, 
    {value: "jumbo", viewValue: "Jumbo"},
    {value: "On pallet", viewValue: "On Pallet(เฉพาะรายตู้)"}
  ];
    


  _object = Object;
  
  constructor() { }

  ngOnInit() {

    // console.log(this._object);
  }

  selected(Droplist){
    console.log(Droplist);
    if(Droplist == "รอผู้ขนส่ง confirm"){
      console.log("กดรอ confirm จ้า");
      this.show = !this.show;
      this.show1 = false;


    }

    if(Droplist == "รอแผนกขนส่งลง Planning"){
      this.show1 = !this.show1;
      this.show = false;
    }
  }

  print(this){
    console.log(this.value);
  }

  filterTab(this){

    console.log("click to filter");

  }

  toggleRemark(){
    this.remark = !this.remark;
    console.log("toggle Remark");
  }

  disableShiptail(this){

    console.log(car);

    // this.disableShip = !this.disableShip;

    
    
  }

 
}
