import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CommonModule } from '@angular/common';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SideNavComponent, DashboardComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-application';

  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;
  innerWidth: any = 1920;
  ngOnInit(): void {
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') == undefined) {
      let todos: any = [
        {
          "title": "learn html",
          "priority": "low",
          "status": "completed",
          "date": "2025-06-30",
          "checked": false
        },
                {
          "title": "learn css",
          "priority": "medium",
          "status": "inprogress",
          "date": "2025-06-30",
          "checked": false
        },
                {
          "title": "learn javascript",
          "priority": "high",
          "status": "pending",
          "date": "2025-06-30",
          "checked": false
        }
      ]
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt: any) => {
      this.innerWidth = evt.target.innerWidth
    });
  }

  isOpen: boolean = true;
  openCreateTodo() {
    this.isOpen = true;
  }

  closeForm(data: boolean) {
    this.isOpen = data;
  }

  darkMode = false;
  setDarkMode() {
    const mainElement = document.getElementById('main');
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      if (mainElement) {
        mainElement.classList.add('dark-theme');
      }
      document.body.classList.add('dark-theme');
    } else {
      if (mainElement) {
        mainElement.classList.remove('dark-theme');
      }
      document.body.classList.remove('dark-theme');
    }
  }
}
