import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  form = new FormGroup({});
  subscription = new Subscription();

  tasksState0$: Observable<TaskModel[]> = new Observable<TaskModel[]>();
  tasksState1$: Observable<TaskModel[]> = new Observable<TaskModel[]>();
  tasksState2$: Observable<TaskModel[]> = new Observable<TaskModel[]>();


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.tasksState0$ = this.taskService.getByState(0);
    this.tasksState1$ = this.taskService.getByState(1);
    this.tasksState2$ = this.taskService.getByState(2);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
