import {createAction, props} from '@ngrx/store';
import Todo from '../../models/todo.model';

export const getTodoAction = createAction('[Todo] - Create Todo');

export const createTodoAction = createAction(
  '[Todo] - Create Todo',
  props<Todo>()
);

export const beginGetTodoAction = createAction('[Todo] - Begin Get Todo');

export const successGetTodoAction = createAction(
  '[Todo] - Success create todo',
  props<{ payload: Todo[] }>()
);

export const beginCreateTodoAction = createAction(
  '[Todo] - Success get todo',
  props<{ payload: Todo }>()
);

export const successCreateTodoAction = createAction(
  '[Todo] - Begin create todo',
  props<{payload: Todo}>()
);

export const errorTodoAction = createAction(
  '[Todo] - Error',
  props<Error>()
);
