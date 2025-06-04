import { Component } from '@angular/core';
import { CreateTodoComponent } from "../create-todo/create-todo.component";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTodoComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private api_service: ApiService
  ) { }

  todoList: Array<any> = new Array();
  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;
  innerWidth: any = 1920;
  ngOnInit(): void {
    let data = this.api_service.getTodos();
    this.todoList = data;

    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt: any) => {
      this.innerWidth = evt.target.innerWidth
    });
  }

  getDueDays(data: any): number {
    let today = new Date().getDate();
    let x = new Date(data).getDate();
    return x - today || 0;
  }

  isOpen: boolean = false;
  openCreateTodo(): void {
    this.isOpen = true;
  }

  currentTodo: any;
  getCurrent(data: any): void {
    this.isOpen = true;
    this.currentTodo = data;
  }

  deleteCurrent(data: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        let x: Array<any> = this.api_service.getTodos();
        x.splice(this.todoList.indexOf(data), 1);
        localStorage.setItem('todos', JSON.stringify(x));
        this.todoList = this.api_service.getTodos();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  closeForm(data: boolean): void {
    this.isOpen = data;
    let x = this.api_service.getTodos();
    this.todoList = x;
  }

}
