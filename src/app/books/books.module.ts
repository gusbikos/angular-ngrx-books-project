import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from './store/books.reducer';
import { EffectsFeatureModule, EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './store/books.effects';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('mybooks', bookReducer),  // in app.module.ts we have the root StoreModule imported.  We must import StoreModule.forFeature to specify the "child store or feature store" and pass in the selector we created and the reducer we created as well so the storemodule knows which store and module to communicate with. 
    EffectsModule.forFeature([BooksEffects]) // - here we register all the effects in an array.  BookEffects is coming from the BookEffects class which is books.effects.ts
  ]
})
export class BooksModule { }
