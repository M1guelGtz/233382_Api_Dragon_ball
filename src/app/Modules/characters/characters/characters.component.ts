import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../../Services/characters.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css'
})
export class CharactersComponent implements OnInit {

  constructor(public _service_characters: CharactersService){}
  user: string = ""
  error : boolean = false
  mostrarCharacters: boolean = false
  handleSubmitData(){
    if(this.isValidUsername(this.user)){
      this.CargarDatos()
      this.error = false
      this.mostrarCharacters = true
    }else{
      this.error= true
    }
  }
  isValidUsername(user: string) {
    return /^[a-zA-Z0-9]+$/.test(user);
  }
  ngOnInit(): void {
    this.CargarDatos()
    this.mostrarCharacters = true
  }
  CargarDatos(){
    this._service_characters.getCharacters().subscribe (
      ( characters ) => {
        console.log(characters);
        characters.items.map(
          (element) =>{
            this._service_characters.characters.push(element)
          }
        )
      }
    )
  }
}
