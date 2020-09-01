import { Component, OnInit } from '@angular/core';
import Todo from '../../models/todo.model';
import { Observable, Subscription } from 'rxjs';
import TodoState from '../../state/todo.state';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as TodoActions from '../../state/todos/todo.action';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todo$: Observable<TodoState>;
  TodoSubscription: Subscription;
  todoError: Error = null;
  TodoList: Todo[] = [];
  title: string;
  completed: boolean;
  id: number;
  userId: number;

  constructor(private store: Store<{ todos: TodoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  ngOnInit(): void {
    this.TodoSubscription = this.todo$
      .pipe(
        map(x => {
          console.log('Data: ', x);
          this.TodoList = x.Todos;
          this.todoError = x.TodoError;
        })
      )
      .subscribe();
    console.log(this.TodoSubscription);
    this.store.dispatch(TodoActions.beginGetTodoAction());
  }

  createTodo() {
    // Todo: creating todo form
    const todo: Todo = { title: this.title, completed: this.completed, id: this.id, userId: this.userId };
    this.store.dispatch(TodoActions.beginCreateTodoAction({ payload: todo}));
    this.title = '';
    this.completed = false;
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.TodoSubscription){
      this.TodoSubscription.unsubscribe();
    }
  }
}
