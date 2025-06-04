import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-application';

  isOpen: boolean = false;
  openCreateTodo() {
    this.isOpen = true;
  }

  closeForm(data: boolean) {
    this.isOpen = data;
  }

  ngOnInit(): void {
    if(localStorage.getItem('todos') === null || localStorage.getItem('todos') == undefined) {
      localStorage.setItem('todos', JSON.stringify([]));
    }
  }
}
