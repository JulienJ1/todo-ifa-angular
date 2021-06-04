import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TaskModel[]>(`${environment.apiUrl}/tasks`);
  }

  getByState(state: number) {
    return this.http.get<TaskModel[]>(`${environment.apiUrl}/tasks?state=${state}`);
  }

  newTask(task: TaskModel) {
    return this.http.post(`${environment.apiUrl}/tasks`, task);
  }

  update(task: TaskModel) {
    return this.http.patch(`${environment.apiUrl}/tasks/${task._id}`, task);
  }

  delete(task: TaskModel) {
    return this.http.delete(`${environment.apiUrl}/tasks/${task._id}`);
  }

  switch(id: string, move: string) {
    return this.http.patch<TaskModel>(`${environment.apiUrl}/tasks/updateState?id=${id}&move=${move}`, {});
  }
}
