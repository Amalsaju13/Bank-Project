import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 

  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    passd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register(){

    if(this.registerForm.get('uname')?.errors){
      alert("incorrect username")
    }

    var acno=this.registerForm.value.acno
    var passd=this.registerForm.value.passd
    var uname=this.registerForm.value.uname

    if(this.registerForm.valid){
      const result=this.ds.register(acno,passd,uname)
    if(result){
      alert("Registration Successfully")
      this.router.navigateByUrl("")

    }
    else{
      alert("Account already exist... Please Log in")
    }

    }
    else{
      alert("Invalid Form")
    }
    
  }

}
