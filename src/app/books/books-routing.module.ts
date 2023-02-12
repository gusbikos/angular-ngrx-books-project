import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }

/* 
  By default, NgModules are eagerly loaded. This means that as soon as the application loads, so do all the NgModules, 
  whether they are immediately necessary or not. For large applications with lots of routes, consider lazy loading 
  —a design pattern that loads NgModules as needed. Lazy loading helps keep initial bundle sizes smaller, which in turn helps 
  decrease load times. 

  ** 
    The above documentation is describing what is happening with the loadChildren anonomyous function.
    Since the booksmodule is rendering the home component, whenever we request the home page only then will the component load.   
  ** 
*/
