import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input({required: true}) isOpen: any;
  @Output() closeSideNav: any = new EventEmitter();


  resizeObservable!: Observable<Event>;
  resizeSubscription!: Subscription;
  ngOnInit(): void {
    this.resizeObservable = fromEvent(window, 'resize');
    this.resizeSubscription = this.resizeObservable.subscribe((evt: any) => {
      if (evt.target.innerWidth < 768) {
        this.closeSideNav.emit(false);
      } else {
        this.closeSideNav.emit(true);
      }
    });
  }

  close(): void {
    this.closeSideNav.emit(false);
  }

}
