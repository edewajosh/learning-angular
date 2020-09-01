import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import  * as TodoActions from '../todos/todo.action';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import Todo from '../../models/todo.model';

@Injectable()
export class TodoEffects {
  constructor(private http: HttpClient, private action$: Actions) {
  }

  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getTodos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.beginGetTodoAction),
      mergeMap(action =>
        this.http.get(this.apiUrl).pipe(
          map((data: Todo[]) => {
            return TodoActions.successGetTodoAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(TodoActions.errorTodoAction(error));
          })
        )
      )
    )
  );

  createTodos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(TodoActions.beginCreateTodoAction),
      mergeMap(action =>
        this.http.post(this.apiUrl, JSON.stringify(action.payload), {
          headers: { 'Content-Type': 'application/json' }
        })
          .pipe(
            map((data: Todo) => {
              return TodoActions.successCreateTodoAction({ payload: data });
            }),
            catchError((error: Error) => {
              return of(TodoActions.errorTodoAction(error));
            })
          )
      )
    )
  );
}
