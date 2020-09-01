import {Action, createReducer, on} from '@ngrx/store';
import * as TodoActions from '../todos/todo.action';
import TodoState, {initializeState} from '../todo.state';
import Todo from '../../models/todo.model';

export const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(TodoActions.getTodoAction, state => state),
  on(TodoActions.createTodoAction, (state: TodoState, todo: Todo) => {
    return { ...state, Todos: [...state.Todos, todo], TodoError: null};
  }),
  on(TodoActions.successGetTodoAction, (state: TodoState, { payload}) => {
    return { ...state, Todos: payload };
  }),
  on(TodoActions.successCreateTodoAction, (state: TodoState, { payload }) =>{
    return { ...state, Todos: [...state.Todos, payload], TodoError: null };
  }),
  on(TodoActions.errorTodoAction, (state: TodoState, error: Error) => {
    console.log(error);
    return { ...state, TodoError: error };
  })
);

export function TodoReducer(state: TodoState | undefined, action: Action){
  return reducer(state, action);
}
