import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  depositForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    passd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })
  
  withdrawForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    passd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]

  })
    user:any
    loginDate:any

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    this.user=this.ds.currentUsername
    this.loginDate= new Date()
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("Please Log in....")
      this.router.navigateByUrl("")
    }   
  }
  deposit(){
    var acno=this.depositForm.value.acno
    var passd=this.depositForm.value.passd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      const result=this.ds.deposit(acno,passd,amount)
      if(result){
        alert(amount+" deposited successfully : "+result)
      }
      else{
        alert("Invalid Form")
      }

    }

  }

  withdraw(){
    var acno1=this.withdrawForm.value.acno
    var passd1=this.withdrawForm.value.passd
    var amount1=this.withdrawForm.value.amount

    if(this.withdrawForm.valid){
      const result=this.ds.withdraw(acno1,passd1,amount1)
    if(result){
      alert(amount1+" debited successfully and new balance : "+result)
    }
    }
    else{
      alert("invalid form")
    } 
  }

  logout(){
      localStorage.removeItem("currentUsername")
      localStorage.removeItem("currentAcno")
      this.router.navigateByUrl("")
  }
}
