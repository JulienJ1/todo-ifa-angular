import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: 'list-task.component.html'
})

export class ListTaskComponent implements OnInit, OnDestroy {

  @Input() label: string = '';
  @Input() state: number = -1;
  @Input() tasks$: Observable<TaskModel[]> = new Observable<TaskModel[]>();

  @Output() onChangeTask = new EventEmitter();

  form = new FormGroup({});
  showForm = false;
  onEdit = false;
  subscription = new Subscription();

  _loading = true;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    });
  }

  switchDown(id: string): void {
    this.showForm = false;
    const sub = this.taskService.switch(id, 'down').subscribe(() => this.onChangeTask.emit());
    this.subscription.add(sub);
  }

  switchUp(id: string): void {
    this.showForm = false;
    const sub = this.taskService.switch(id, 'up').subscribe(() => this.onChangeTask.emit());
    this.subscription.add(sub);
  }

  newTask(): void {
    if (this.form.valid) {
      // Post
      if (!this.onEdit) {
        this.subscription.add(
          this.taskService.newTask(this.form.getRawValue())
            .subscribe(
              () => {
                this.form.reset();
                this.onChangeTask.emit();
              },
              error => { console.log(error) }
            )
        );
      } else {
        this.subscription.add(
          this.taskService.update(this.form.getRawValue())
            .subscribe(
              () => {
                this.showForm = false;
                this.form.reset();
                this.onChangeTask.emit();
              },
              error => { console.log(error) }
            )
        );
      }

    }
  }

  displayForm(): void {
    this.showForm = !this.showForm;
    this.onEdit = false;
  }

  editForm(task: TaskModel): void {
    this.form = new FormGroup({
      _id: new FormControl(task._id, [Validators.required]),
      title: new FormControl(task.title, [Validators.required]),
      content: new FormControl(task.content, [Validators.required]),
      state: new FormControl(task.state, [Validators.required]),
    });

    this.showForm = true;
    this.onEdit = true;
  }

  deleteTask(task: TaskModel): void {
    this.subscription.add(
      this.taskService.delete(task)
        .subscribe(
          () => {
            this.onChangeTask.emit();
          },
          error => { console.log(error) }
        )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
