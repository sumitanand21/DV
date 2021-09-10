import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from "./../../../material.module";
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

// import { NgxIndexedDBModule } from 'ngx-indexed-db';

import { OppmodRoutingModule } from './oppmod-routing.module';
import { DashboardComponent,createTaskPopup } from './../../dashboard/dashboard.component';
import { ProfileComponent } from './../../profile/profile.component';
import { SettingsComponent } from './../../settings/settings.component';
import { TaskcreaterComponent } from './../../taskcreater/taskcreater.component';
import { OppComponent } from './../../opp/opp.component';
import { HeadercompComponent } from './../../headercomp/headercomp.component';


@NgModule({
  declarations: [    
    DashboardComponent,
    TaskcreaterComponent,
    createTaskPopup,
    OppComponent,
    ProfileComponent,
    SettingsComponent,
    HeadercompComponent
  ],
  imports: [
    CommonModule,
    OppmodRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents:[    
    createTaskPopup,
  ],
})
export class OppmodModule { }
