import { Input,Component, OnInit, ElementRef, Directive } from '@angular/core';
import { MatSelectChange, MatDatepickerInputEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { NgControl, FormControl, FormGroupDirective, FormGroup, NgForm, Validators, FormArray, FormBuilder,FormsModule } from '@angular/forms';
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

  quantityY = new FormControl();

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
        "matno_Qty": "1100NK^1000.00|2300SC^500.00|1100WW^2000.00",
        "isforklift": null,
        "labor_id1": null,
        "labor_id2": null
      },
      {
        "shipemnt_type": "Z102",
        "vehicle_text": "703206สค",
        "storage": null,
        "storage_id": 33,
        "dock": null,
        "shipment_no": 51,
        "shipment_id": 51,
        "delivery_no": "344444444",
        "delivery_id": 111,
        "matno_Qty": "22222NK^9000.00|4355SC^500.00",
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
        "shipment_no": 52,
        "shipment_id": 52,
        "delivery_no": "3140153881",
        "delivery_id": 222,
        "matno_Qty": "55550NK^9000.00|4444SC^500.00",
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
        "shipment_no": 52,
        "shipment_id": 52,
        "delivery_no": "3140153881",
        "delivery_id": 222,
        "matno_Qty": "66600NK^9000.00",
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
        "shipment_no": 52,
        "shipment_id": 52,
        "delivery_no": "3140153881",
        "delivery_id": 222,
        "matno_Qty": "777700NK^9000.00",
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
        "shipment_no": 53,
        "shipment_id": 52,
        "delivery_no": "3140153881",
        "delivery_id": 222,
        "matno_Qty": "1100NK^9000.00",
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

  public quantityForm: FormGroup;
  quantts = new FormControl();


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loading_date = moment().format("YYYY-MM-DDTHH:mm:ss");
    this.getWarehouse = this.sim_getStorage as Type.ResponseCbStorage;

    this.quantityForm = this.formBuilder.group({
      quants: this.formBuilder.array([this.createQuantityFormGroup()])
    });

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

  //-------------- duplicate shipment no.
  sameShipNo: Array<string> = [];

  //----------------- grade to show
  grade_toShow = [];

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
      if (this.getResProSearchLab.message == 'OK') {
        this.GradeToShow();
        this.sameShipNo[0] = 'none';
        for (let i = 1; i < this.getResProSearchLab.result.length; i++) {
          if (this.getResProSearchLab.result[i].shipment_no == this.getResProSearchLab.result[i - 1].shipment_no) {
            // console.log("-----------------same shipnment no")
            this.sameShipNo[i] = 'same';
          } else {
            this.sameShipNo[i] = 'none';
          }
        }
      }


    }
    else {
      alert("กรุณาเลือกสถานะ")
    }

    //------ API to send
    //-------api/v1/Process/ProcessSearchLaborProcess?loadingDate=2019-12-11 00:00:00.000&storageId=1&statusId=11
    // console.log("loadingDate: ", this.loading_date, "storageID: ", this.storageID, "statusID: ", this.statusID)

    // this.getResProSearchLab = this.sim_resProSeaLab as Type.ResponseProcessSearchLabour;
    if (this.getResProSearchLab.message == "OK") {

      this.getLabour = this.sim_getLabour as Type.ResponseLabour;
      for(let u=0; u < this.getResProSearchLab.result.length; u++){
        this.bt_save[u] = true;
      }

      // console.log("TABLE OK")
    }

  }

  public addQuantityFormGroup(l) {
    let quants = this.quantityForm.get('quants') as FormArray
    // quants = null;
    console.log("-----------", l)
    console.log("before", quants.value)
    for (let i = 0; i < l.length - 1; i++) {
      quants.push(this.createQuantityFormGroup())
    }

    console.log("after", quants.value);



  }

  private createQuantityFormGroup(): FormGroup {
    return new FormGroup({
      'qquantity': new FormControl('')
    })
  }



  grade_qty = [];
  save_grade_qty = [];

  grade_quant = [];

  GradeToShow() {
    // console.log(this.grade_qty);
    for (let r = 0; r < this.getResProSearchLab.result.length; r++) {
      this.grade_quant[r] = this.getResProSearchLab.result[r].matno_Qty.split('|');


      let gradee = [];
      let quantityyy = [];


      for (let y = 0; y < this.grade_quant[r].length; y++) {
        let grade1 = this.grade_quant[r][y].split('^');
        gradee[y] = grade1[0];
        quantityyy[y] = grade1[1];
      }

      let now_obj = {
        rowIndex: r,
        grade: gradee,
        quantity: quantityyy
      }

      let now_obj2 = {
        rowIndex: r,
        grade: gradee,
        quantity: []
      }
      this.grade_qty.push(now_obj);
      this.save_grade_qty.push(now_obj2);

      // console.log(this.grade_qty[r].quantity)

      // this.addQuantityFormGroup(this.grade_qty[r].grade);
      // console.log(this.grade_qty)
    }
  }

  qty: string;
  selectedToSave(evt, i, type) {
    console.log(evt, i, type);

    if (type == 'forklift') {
      if (evt == "Y") {
        this.Isforklift_ary[i] = evt;
        this.labor_id1_ary[i] = 0;
        this.labor_id2_ary[i] = 0;
        this.bt_save[i] = true;
        // this.worker1.disable();
      }
      else {
        this.Isforklift_ary[i] = evt;
        // this.worker1.enable();
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

    console.log("-------grade and qty", this.save_grade_qty[i].quantity);


    // console.log(i, "updwon:", this.up_down_ary, "forklift:", this.Isforklift_ary, "worker1:", this.labor_id1_ary, "worker2:", this.labor_id2_ary)
    let deliverid = this.getResProSearchLab.result[i].delivery_id;
    let wh_do = this.getResProSearchLab.result[i].storage_id;
    let up_down = this.up_down_ary[i];
    let isforklift = this.Isforklift_ary[i];
    let labor_id1 = this.labor_id1_ary[i];
    let labor_id2 = this.labor_id2_ary[i];
    let userId = 999;

    let gr_qt = [];
    if (this.save_grade_qty[i].grade.length > 1) {
      for (let j = 0; j < this.save_grade_qty[i].quantity.length; j++) {
        gr_qt[j] = this.save_grade_qty[i].grade[j] + '^' + this.save_grade_qty[i].quantity[j];

      }
      let mat_qty = gr_qt.toString().replace(/,/g,'|');
      console.log("MORE THAN 1 GRADE", i, mat_qty)

    }
    else {
      let mat_qty = this.save_grade_qty[i].grade + '^' + this.save_grade_qty[i].quantity;
      console.log("======= 1 GRADE", mat_qty)
    }

    console.log("00000000000000CEHCK",this.Isforklift_ary,"worker1", this.labor_id1_ary,"worker2",this.labor_id2_ary)

    //----------api/v1/Process/ProcessManualStartLabourForklift?deliverid=111&wh_do=11&up_down=U&Isforklift=N&labor_id1=2&labor_id2=3&userId=999

    // console.log("sendtoStart:", i, "deliverID:", deliverid, "wh_no:", wh_do, "updown:", up_down, "isforklift", isforklift, "worker1:", labor_id1, "worker2:", labor_id2);

    // console.log("-------**** QUANT", this.grade_qty[i].quantity)
  }

  sendEnd(i) {

    //----------api/v1/Process/ProcessManualEndLabourForklift?deliverid=111&wh_do=11&userId=999
    let deliverid = this.getResProSearchLab.result[i].delivery_id;
    let wh_do = this.getResProSearchLab.result[i].storage_id;
    let userId = 999;
    console.log("sendtoEnd", i, "deliverId:", deliverid, "wh_do:", wh_do);
  }



  OnchangeQty(quant, row, y) {

    

    this.save_grade_qty[row].quantity[y] = quant;

    // let save_grade_qty = new Array(this.getResProSearchLab.result.length)
    // let now_obj = {
    //   rowIndex: row,
    //   grade: this.grade_qty[row],
    //   quantity: quant
    // }
    // this.save_grade_qty[row].push(now_obj);

   
    console.log(">>>>", quant, this.save_grade_qty[row]);
    // console.log(">>>>", quant, this.save_grade_qty);
 
  }
}
