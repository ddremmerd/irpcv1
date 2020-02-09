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
      this.router.navigate(["ldlt11"]);
    }
    

    else if(this.mUsername =="ship" && this.mPassword == "1234"){
      this.router.navigate(["ldls1"]);
      console.log("ship page");
    }
    
    else{
      window.alert("log in fail");
    }

  }
}
