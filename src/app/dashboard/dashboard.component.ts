import { Component } from '@angular/core';
import { CreateTodoComponent } from "../create-todo/create-todo.component";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTodoComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private api_service: ApiService
  ) {}

  todoList: Array<any> = new Array();
  ngOnInit(): void {
    let data = this.api_service.getTodos();
    this.todoList = data;
  }

  isOpen: boolean = false;
  openCreateTodo() {
    this.isOpen = true;
  }

  currentTodo: any;
  getCurrent(data: any): void {
    this.isOpen = true;
    this.currentTodo = data;
  }

  closeForm(data: boolean) {
    this.isOpen = data;
    
    let x = this.api_service.getTodos();
    this.todoList = x;
  }

}
