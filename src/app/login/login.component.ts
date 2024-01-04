import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    passd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  login() {
    var acno = this.loginForm.value.acno
    var passd = this.loginForm.value.passd
    if(this.loginForm.valid){
    const result=this.ds.login(acno,passd)
    if(result){
      alert("Login Successfull")
      this.router.navigateByUrl("dashboard")
    }

  }
  else{
    alert("Invalid Form")
  }
}
}
