import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./books/books.module').then(b => b.BooksModule)
  // }

  // The code above is an example of lazy loading.  I will not be using it in this application but a good example of how it can be achieved.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
