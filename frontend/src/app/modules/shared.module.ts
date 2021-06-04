import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const ComponentList = [
  NavbarComponent
]

const ModuleList = [
  RouterModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule
]

@NgModule({
  declarations: [
    ...ComponentList
  ],
  imports: [
    ...ModuleList
  ],
  exports: [
    ...ComponentList,
    ...ModuleList,
  ]
})
export class SharedModule { }
