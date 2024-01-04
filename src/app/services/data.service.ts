import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUsername:any
  currentAcno:any

  database: any = {
    1000: { acno: 1000, uname: "Amal", password: 1000, balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "Vishak", password: 1001, balance: 4000,transaction:[] },
    1002: { acno: 1002, uname: "Afsal", password: 1002, balance: 6000,transaction:[] },
    1003: { acno: 1003, uname: "Sinan", password: 1003, balance: 4000,transaction:[] }
  }

  constructor() {
    this.getDetails()
   }

  saveDetails(){
    localStorage.setItem("database",JSON.stringify(this.database))
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
    if(this.currentUsername){
      localStorage.setItem("currentUsername",JSON.stringify(this.currentUsername))
    }

  }

  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")||'')
    }
    if(localStorage.getItem("currentUsername")){
      this.currentUsername=JSON.parse(localStorage.getItem("currentUsername")||'')
    }
  }

  register(acno:any,password:any,uname:any){

    let database=this.database

    if(acno in database){
      return false
    }
    else{
      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      this.saveDetails()
      return true
    }

  }
  login(acno:any,passd:any) {
    

    let database = this.database

    if (acno in database) {

      if (passd == database[acno]["password"]) {
        this.currentUsername=database[acno]["uname"]
        this.currentAcno=acno
        this.saveDetails()
        return true
      }
      else {
        alert("Incorrect Password")
        return false
      }
    }
    else {
      alert("Account does not exist")
      return false
    }
  }
  deposit(acno:any,passd:any,amt:any){
    var amount=parseInt(amt)
    let  database=this.database
    if(acno in database){
      if(passd==database[acno]["password"]){
        database[acno]["balance"]+=amount
        database[acno]["transaction"].push({
          type:"CREDIT",
          amount:amount
        })
        this.saveDetails()
        return  database[acno]["balance"]

      }
      else{
        alert("Incorrect Password")
        return false
      }    
    }
  }
  withdraw(acno:any,passd:any,amt:any){
    var amount=parseInt(amt)
    let  database=this.database

    if(acno in database){
      if(passd==database[acno]["password"]){
        if(database[acno]["balance"]>amount){
          database[acno]["balance"]-=amount
          database[acno]["transaction"].push({
            type:"DEBIT",
            amount:amount
          })
          this.saveDetails()
          return  database[acno]["balance"]
        }
        else{
          alert("Insufficient balance")
          return false
        }
        
      }
      else{
        alert("Incorrect Password")
        return false
      }
    }
    else{
      alert("Account doesnot exist")
      return false
    }
  }
  getTransaction(acno:any){
    return this.database[acno]["transaction"]
  }
}
