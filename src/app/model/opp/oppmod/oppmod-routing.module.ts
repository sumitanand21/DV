import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './../../dashboard/dashboard.component';
import { ProfileComponent } from './../../profile/profile.component';
import { SettingsComponent } from './../../settings/settings.component';
import { TaskcreaterComponent } from './../../taskcreater/taskcreater.component';
import { OppComponent } from './../../opp/opp.component';
import { AuthGuard } from './../../../auth.guard';


const routes: Routes = [


  
  { path: '', component: OppComponent,canActivateChild: [AuthGuard],


    children: [
      {           //commented to remove the login page 
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      
      { path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      
      { path: 'settings', component: SettingsComponent},
      { path: 'task', component: TaskcreaterComponent},



    
]  
  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppmodRoutingModule { }
