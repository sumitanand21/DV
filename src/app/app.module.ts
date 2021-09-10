import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './model/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from "./material.module";
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { NgxIndexedDBModule,DBConfig } from 'ngx-indexed-db';

export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore('Task');
      // store.createIndex('country', 'country', { unique: false });
    }
  };
}


const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'Task',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'taskName', keypath: 'taskName', options: { unique: false } },
      { name: 'tOTask', keypath: 'tOTask', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } },
      { name: 'tEval', keypath: 'tEval', options: { unique: false } },
      { name: 'eDesc', keypath: 'eDesc', options: { unique: false } },
      { name: 'startDate', keypath: 'startDate', options: { unique: false } },
      { name: 'endDate', keypath: 'endDate', options: { unique: false } }
    ]
  }],
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  entryComponents:[    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
