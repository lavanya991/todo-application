import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-todo',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
  animations: [
  trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class CreateTodoComponent {

  @Input({required: true}) todo: any;
  @Input({required: true}) isOpen: any;
  @Output() closeForm: any = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private api_service: ApiService
  ) {}

  ngOnInit(): void {
    this.createFormControl();
  }
  
  ngOnChanges(): void {
    if(this.todo) {
      this.form = this.fb.group(this.todo);
    }
  }

  form!: FormGroup;
  createFormControl(): void {
    this.form = this.fb.group({
      title: new FormControl(''),
      priority: new FormControl(''),
      status: new FormControl('pending'),
      date: new FormControl('')
    })
  }

  submit(): void {
    let x: Array<any> = this.api_service.getTodos();
    if(this.todo) {
      x.map((item, i) => {
        if(item.title == this.todo.title) {
          x[i] = this.form.value;
        }
      });
      localStorage.setItem('todos', JSON.stringify(x));
    } else {
      this.api_service.createTodo(this.form.value);
    }
    this.close();
  }

  close() {
    this.closeForm.emit(false);
    this.form.reset();
    this.api_service.getTodos();
  }

}
