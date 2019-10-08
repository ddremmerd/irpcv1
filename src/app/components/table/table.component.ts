import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  TableHeader2=["No.","รอบเวลา","11","12","13","14"];
    TableData2=[
    {id:1, time:"08:00-09:00", T11:true, T12:false, T13:true, T14:false},
    {id:2, name:"0:00-10:00", T11:false, T12:true, T13:true, T14:false},
    {id:3, name:"10:00-11.00", T11:true, T12:true, T13:true, T14:false},
  ];
  _object = Object;

}
