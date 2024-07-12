import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { HomeButtonComponent } from './components/home-button/home-button.component';
import { MatIconModule } from '@angular/material/icon';
import { HangmanComponent } from './components/hangman/hangman.component';
import { HangmanDirective } from './directives/hangman.directive';
import { HangmanWordToDisplayPipe } from './pipes/hangman-word-to-display.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundComponent,
    RegistrationFormComponent,
    HomeButtonComponent,
    HangmanComponent,
    HangmanDirective,
    HangmanWordToDisplayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
