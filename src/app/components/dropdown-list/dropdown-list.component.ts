import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-dropdown-list',
  templateUrl: './dropdown-list.component.html',
  styleUrls: ['./dropdown-list.component.css']
})
export class DropdownListComponent implements OnInit {

  @Input() DropdownHeader;
  @Input() ListHeader;


  // public x;
  selectedDay: string = '';

  selectChangeHandler (event: any) {
    //update the ui
    this.selectedDay = event.target.value;
  }

 


  constructor() { }

  ngOnInit() {
  }

  selected(Droplist){
    // var x = Droplist;
    console.log(Droplist);
    
  }

  sortingData(Droplist){

    

  }




}
