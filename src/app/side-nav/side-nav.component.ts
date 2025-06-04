import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  @Input({required: true}) isOpen: any;
  @Output() closeSideNav: any = new EventEmitter();

  ngOnInit(): void {
    // console.log(this.isOpen)
  }

  close(): void {
    this.closeSideNav.emit(false);
  }

}
