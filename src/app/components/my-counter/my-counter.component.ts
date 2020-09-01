import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {decrement, increment, reset} from '../../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent implements OnInit {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit(): void {
  }

  increment() {
    // TODO: Dispatch an increment action
    this.store.dispatch(increment());
  }

  decrement() {
    // TODO: Dispatch an decrement action
    this.store.dispatch(decrement());
  }

  reset() {
    // TODO: Dispatch an reset action
    this.store.dispatch(reset());
  }
}
