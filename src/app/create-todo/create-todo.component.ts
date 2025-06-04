import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-todo',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {

  @Input({required: true}) todo: any;
  @Input({required: true}) isOpen: any;
  @Output() closeForm: any = new EventEmitter();

  today: any;
  constructor(
    private fb: FormBuilder,
    private api_service: ApiService
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.createFormControl();
  }
  
  ngOnChanges(): void {
    // console.log(this.todo);
    if(this.todo) {
      this.form = this.fb.group(this.todo);
    }
  }

  form!: FormGroup;
  createFormControl(): void {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      priority: new FormControl(''),
      status: new FormControl('pending'),
      date: new FormControl('')
    })
  }

  submitted: boolean = false;
  submit(): void {
    this.submitted = true;
    if(this.todo) {
      let x: Array<any> = this.api_service.getTodos();
      x.map((item, i) => {
        if(item.title == this.todo.title) {
          x[i] = this.form.value;
        }
      });
      localStorage.setItem('todos', JSON.stringify(x));
      this.close();
    } else {
      if(this.form.valid) {
        this.api_service.createTodo(this.form.value);
        this.close();
      } else {
        Swal.fire("Please fill the fields!");
      }
    }
  }

  close() {
    this.closeForm.emit(false);
    this.todo = null;
    this.form.reset();
    this.api_service.getTodos();
  }

}
