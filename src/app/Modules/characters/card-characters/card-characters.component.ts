import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharactersService } from '../../../Services/characters.service';

@Component({
  selector: 'app-card-characters',
  templateUrl: './card-characters.component.html',
  styleUrl: './card-characters.component.css'
})
export class CardCharactersComponent implements OnInit {

  constructor( private route : Router, private _service_characters: CharactersService){}
  ngOnInit(): void {
    this._service_characters.getCharacterByID(this.Character.id).subscribe(
      (data) => {
        console.log(data);
        this.originPlanet = data
      }, e => console.log(e) 
    )
  }
  modal: boolean = false
  @Input() Character = {
    id: 0,
    name: "",
    ki:"  ",
    maxKi: "",
    race: "",
    gender: "",
    description: "",
    image: "",
    affiliation: ""
  }
  originPlanet! : any;
  handleClickTransformaciones(){
    this.route.navigate(["transformations/", this.Character.name.toLowerCase()])
  }
  handleClickOriginPlanet(){
    this.modal = true;
  }
  handleClickOriginPlanetClose(){
    this.modal = false;
  }
}
