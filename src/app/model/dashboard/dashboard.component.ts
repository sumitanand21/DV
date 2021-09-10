import { Component,Inject, OnInit,ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HeroService } from 'src/app/hero.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  outval = true;
  Inval = true;
  constructor(public dialog: MatDialog,public sharedservice: HeroService,private router: Router) { }

  ngOnInit(): void {
    this.sharedservice.getAllDBData().subscribe(res=> {
    this.assignData(res);
    },err=>{
      this.assignData([]);
    });
  }

  logout(){
    this.router.navigate(['/login']);
  }

  openDialogTask() {
    let dialogRef = this.dialog.open(createTaskPopup, {
      width: "888px",
      height: "573px",
      panelClass: 'myapp-no-padding-dialog',
      data: {name:"sumit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result == 'save'){
        this.sharedservice.getAllDBData().subscribe(data=>{
          this.assignData(data);
        },err=>{
          this.assignData([]);
        })
      }
   
    });
  }

  dummyToReview = [{ id:0 , taskName : "Report title, Lorem ipsum dolor sit amet." , imgUrl :"assets/Ellipse 60.png" },
  {id:0,taskName : "Report title, Lorem ipsum dolor sit amet." , imgUrl : "assets/Ellipse 113.png"}]

  dummyOngoing:any = [{ id:0 , taskName : "Report title, Lorem ipsum dolor sit amet." , perc : 50 , imgUrl :"assets/Ellipse 60.png" },
                      {id:0,taskName : "Report title, Lorem ipsum dolor sit amet." , perc : 35 , imgUrl : "assets/Ellipse 103 (2).png"}]
  displayOngoing : any = this.dummyOngoing.map(it=>Object.assign({},it));
  displayReview : any = this.dummyToReview.map(it=>Object.assign({},it));
  assignData(data){
  data.sort((a, b) => (a.id < b.id) ? 1 : -1);
  this.toOngoing(data);
  this.toReview(data);

  }

  calculatedays(stDate,eddate){
    let currDate:any = new Date
    let startDate: any = new Date(stDate)
    let diffTimesc = Math.abs(currDate - startDate);
    let dayssc = Math.ceil(diffTimesc / (1000 * 60 * 60 * 24));

    let endDate: any = new Date(eddate)
    let diffTimese = Math.abs(endDate - startDate);
    let daysse = Math.ceil(diffTimese / (1000 * 60 * 60 * 24));

    return Math.round((dayssc / daysse)*100) ; 
  }

  toOngoing(data){
    let currDate:any = new Date();
    let filterData : any = data.filter(it=> new Date(it.startDate) < currDate && new Date(it.endDate) > currDate);
    if(filterData.length == 0){
     this.displayOngoing = this.dummyOngoing.map(it=> Object.assign({},it));
    }else if(filterData.length == 1){
      this.displayOngoing[0].id = filterData[0].id;
      this.displayOngoing[0].taskName = filterData[0].taskName;
      this.displayOngoing[0].perc = this.calculatedays(filterData[0].startDate,filterData[0].endDate);
      
      this.displayOngoing[1].id = this.dummyOngoing[1].id;
      this.displayOngoing[1].taskName = this.dummyOngoing[1].taskName;
      this.displayOngoing[1].perc = this.dummyOngoing[1].perc;

    }else{
  for(let i=0;i<2;i++){
    this.displayOngoing[i].id = filterData[i].id;
    this.displayOngoing[i].taskName = filterData[i].taskName;
    this.displayOngoing[i].perc = this.calculatedays(filterData[i].startDate,filterData[i].endDate);
  }
    }
  }

  toReview(data){
    let currDate:any = new Date();
    let filterData : any = data.filter(it=> new Date(it.endDate) < currDate);
    if(filterData.length == 0){
     this.displayReview = this.dummyToReview.map(it=> Object.assign({},it));
    }else if(filterData.length == 1){
      this.displayReview[0].id = filterData[0].id;
      this.displayReview[0].taskName = filterData[0].taskName;
      
      this.displayReview[1].id = this.dummyToReview[1].id;
      this.displayReview[1].taskName = this.dummyToReview[1].taskName;
    }else{
  for(let i=0;i<2;i++){
    this.displayReview[i].id = filterData[i].id;
    this.displayReview[i].taskName = filterData[i].taskName;
  }
    }
  }

}



@Component({
  selector: 'app-createTaskPopup',
  templateUrl: './createTaskPopup.html',
  styleUrls: ['./dashboard.component.scss']
})
export class createTaskPopup implements OnInit {

  taskDetails : any = {
  taskName : "",
  description : "",
  tOTask : "",
  tEval:"",
  eDesc:"",
  startDate:"",
  endDate:""
    }
    submitted:boolean = false;

  constructor(public sharedservice: HeroService,public dialogRef: MatDialogRef<createTaskPopup>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

  savedetails(){
    console.log(this.taskDetails);

  if(this.returnvalue() == true){
    this.submitted = false;
    this.sharedservice.addEntry(this.taskDetails).subscribe(res=>{
       this.dialogRef.close('save');
       this.sharedservice.openSnackBar("Task created successfully", "x");

    },err=>{
      this.sharedservice.openSnackBar("Error while saving", "x");
    });



  }else{
this.submitted = true;
  }
 
    
  }

  returnvalue() {
    let valid = true;
    Object.keys(this.taskDetails).map(key => {
      if(valid == true){
        if(!this.taskDetails[key]){
          valid = false;
                }else if((this.taskDetails[key] == "taskName" || this.taskDetails[key] == "description"|| this.taskDetails[key] == "eDesc" ) && !this.taskDetails[key].trim()){
          valid = false;
                }
      }
     

       
    });
      
    return valid;

  }

}