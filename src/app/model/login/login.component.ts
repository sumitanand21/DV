import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailRegex: any = new RegExp(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/, "g");
  emialAdd :any= "";
  userPassword:any= "";
  submitted = false;
  invalidEmail = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem('Token');
  }

  navigateToDash(){
    this.router.navigate(['/oppview/dashboard']);
  }
  checklogIn(){
    this.invalidEmail = false;
 if(!this.userPassword || !this.emialAdd){
  this.submitted = true;
 }else if(!this.userPassword.trim() || !this.emialAdd.trim()){
this.submitted = true;
 }else{
  let emailVal: any = this.emialAdd.match(this.emailRegex);
  if(emailVal && emailVal.length>0){
    sessionStorage.setItem('Token',"xyzajbfjseFJCEJHBDFBDSJF");
    this.submitted = false;
    this.router.navigate(['/oppview/dashboard']);
  }else{
    this.submitted = true;
    this.invalidEmail = true;
  }
 }
   
 
  }

}
