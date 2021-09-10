import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './model/login/login.component';
import { OppmodModule } from './model/opp/oppmod/oppmod.module';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {           //commented to remove the login page 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent

  },
  { path: 'oppview', canLoad: [AuthGuard], loadChildren: () =>  OppmodModule},
];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
