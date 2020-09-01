import Todo from '../models/todo.model';

export default class TodoState {
  Todos: Array<Todo>;
  TodoError: Error;
}

export const initializeState = (): TodoState => {
  return  { Todos: Array<Todo>(), TodoError: null};
};
