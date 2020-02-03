import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as Type from 'src/models/VariablesType';
import * as moment from 'moment';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    public dialog: MatDialogRef<DialogBoxComponent>) { }

  ngOnInit() {

    console.log(this.data)
    
  }

  closeDialog() {
    this.dialog.close({ event: 'Cancel' });
  }

}
