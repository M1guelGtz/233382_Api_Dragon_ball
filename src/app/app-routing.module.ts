import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './Modules/characters/characters/characters.component';
import { TransformationComponent } from '../app/Modules/transformations/transformations/transformations.component';


const routes: Routes = [
  {
    path: "",
    component: CharactersComponent
  },
  { path: 'transformations/:name', component: TransformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
