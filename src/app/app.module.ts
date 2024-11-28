import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CharactersModule } from './Modules/characters/characters.module';
import { AppRoutingModule } from './app-routing.module';
import { TransformationComponent } from '../app/Modules/transformations/transformations/transformations.component';

@NgModule({
  declarations: [
    AppComponent,
    TransformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CharactersModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
