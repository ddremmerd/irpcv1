import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mUsername:string = "";
  mPassword:string = "";

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClickSubmit(){
    if (this.mUsername == "admin" && this.mPassword == "1234"){
      // window.alert("log in success");
      this.router.navigate(["vendor1"]);
    }
    else{
      window.alert("log in fail");
    }
  }
}
