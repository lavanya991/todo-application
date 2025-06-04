import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getTodos() {
     let todos = JSON.parse(localStorage.getItem('todos')!);
     return todos;
   }

  createTodo(payload: any): void {
    let data: Array<any> = JSON.parse(localStorage.getItem('todos')!);
    data.push(payload);
    localStorage.setItem('todos', JSON.stringify(data));
  }
}
