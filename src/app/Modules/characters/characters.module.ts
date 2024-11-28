import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CardCharactersComponent } from './card-characters/card-characters.component';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters/characters.component';
import { ListCharactersComponent } from './list-characters/list-characters.component';

@NgModule({
  declarations: [
    CharactersComponent,
    ListCharactersComponent,
    CardCharactersComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    FormsModule
  ]
})
export class CharactersModule { }
