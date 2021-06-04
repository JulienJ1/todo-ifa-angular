import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared.module';
import { HomeRoutingModule } from './home-routing';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { ListTaskComponent } from '../../components/list-task/list-task.component';



@NgModule({
  declarations: [
    TaskComponent,
    UserComponent,
    ListTaskComponent,
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
