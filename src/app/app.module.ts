import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {counterReducer} from './counter.reducer';
import { MyCounterComponent } from './components/my-counter/my-counter.component';
import { ToDoComponent } from './components/to-do/to-do.component';
import {FormsModule} from '@angular/forms';
import {TodoReducer} from './state/todos/todo.reducer';
import {TodoEffects} from './state/todos/todo.effects';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer, todos: TodoReducer }),
    StoreDevtoolsModule.instrument({name: 'Counter', maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([TodoEffects]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
