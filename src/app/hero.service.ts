import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable,defer } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(public dbService: NgxIndexedDBService,private snackBar: MatSnackBar) { 
  }

  getAllDBData():Observable<any>{

    return defer(()=>{
return this.dbService.getAll('Task') 
  .then(
      task => {
         return task;
      },
      error => {
        return error;
      }
  );
    });
    
  }


  // addEntry(objval):Promise<any>{
  //  return this.dbService.add('Task', { taskName: objval.taskName, 
  //     tOTask: objval.tOTask,
  //     description:objval.description,
  //     tEval:objval.tEval,
  //     eDesc:objval.eDesc,
  //     startDate:objval.startDate,
  //     endDate:objval.endDate }).then(
  //     (res) => {
  //       console.log(res);
  //       return res;
  //       // resolve(res);
  //         // Do something after the value was added
  //     },
  //     error => {
  //       console.log(error);
  //       return error;
  //       // resolve(error);
     
  //     }
  // );
  // }

   addEntry(objval):Observable<any>{
    return defer(()=>{ return this.dbService.add('Task', { taskName: objval.taskName, 
       tOTask: objval.tOTask,
       description:objval.description,
       tEval:objval.tEval,
       eDesc:objval.eDesc,
       startDate:objval.startDate,
       endDate:objval.endDate }).then(
            (res) => {
              return res;
            },
            error => {
              return error;
           
            }
        );
   });
  }

  openSnackBar(message: string,action) {
    this.snackBar.open(message,action, {
      duration: 2000,
    });
  }


}
