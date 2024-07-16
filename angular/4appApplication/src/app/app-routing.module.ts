import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { HangmanComponent } from './components/hangman/hangman.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { ShowListComponent } from './components/show-list/show-list.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'registration-form', component: RegistrationFormComponent },
  { path: 'hangman', component: HangmanComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent},
  { path: 'show-list', component: ShowListComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
