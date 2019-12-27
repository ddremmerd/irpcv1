import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroupDirective, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Comp from 'src/models/ComponentClass'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() ddName: string
  @Input() index_row: number;
  @Input() options: Array<{
    id: number,
    name: string,
  }>;
  @Input() selectValue: {
    id: number,
    name: string,
  };



  ObjectSelected: {
    dropdownName: string,
    rowIndex: number,
    selectedId: number,
  };
  @Output() SelectedDdValue = new EventEmitter();

  DropdownForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // console.log(this.ddName, this.options)
    // console.log(this.selectValue);

    this.DropdownForm = this.fb.group({
      DropdownForm: [null, Validators.required]
    });

    this.DropdownForm.get('DropdownForm').setValue(this.selectValue.id);
  }


  SelectedDropdown(selected_val) {
    this.ObjectSelected = {
      dropdownName: this.ddName,
      rowIndex: this.index_row,
      selectedId: selected_val
    };

    // console.log(this.ObjectSelected);
    this.SelectedDdValue.emit(this.ObjectSelected);


  }


}
