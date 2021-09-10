import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headercomp',
  templateUrl: './headercomp.component.html',
  styleUrls: ['./headercomp.component.scss']
})
export class HeadercompComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateTo(val){
    if(val == 'profile'){
      this.router.navigate(['/oppview/profile']);
    }else if(val == 'settings'){
      this.router.navigate(['/oppview/settings']);
    }
    else if(val == 'task'){
      this.router.navigate(['/oppview/task']);
    }
    else if(val == 'dashboard'){
      this.router.navigate(['/oppview/dashboard']);
    }    else if(val == 'logout'){
      this.router.navigate(['/login']);
    }
  }

}
