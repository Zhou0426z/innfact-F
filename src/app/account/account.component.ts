import { Component, OnInit } from "@angular/core";
import { FbService } from "src/Service/fb-service";
import { OutAccountVM } from "src/ViewModels/Out/out-account-vm";
import { AccountService } from "src/Service/account-service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { LineService } from 'src/Service/line-service';
@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  constructor(
    private fbService: FbService,
    private accountService: AccountService,
    private lineService :LineService,
    private router:Router
  ) {
    this.normalSignUpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ),
      birthday: new FormControl(),
      password: new FormControl(null, Validators.required),
      passwordConfirm: new FormControl(null, Validators.required)
    });
  }
  outAccountVM: OutAccountVM;
  normalSignUpForm: FormGroup;
  ngOnInit() {
    this.fbService.fbLoginInit();
  }
  fbSignUp() {
   this.fbService.fbSignUp();
  }
  lineSignUp(){
    this.lineService.lineLoginInit();
  }
  normalSignUp(value) {
    if (value.password != value.passwordConfirm) {
      alert("密碼輸入錯誤，請檢查後重試");
      return;
    }
    this.outAccountVM = {
      email: value.email,
      userName: value.name,
      birthday: value.birthday,
      password: value.password,
      loginBy: "normal"
    };
    this.accountService.signUp(this.outAccountVM).subscribe(data=>{
      localStorage.setItem("id", data.accountID.toString());

    });
    localStorage.setItem("name", value.name);
    localStorage.setItem("email", value.email);
    localStorage.setItem("isLogin", "true");
    this.router.navigate(["index"]);



  }
}
