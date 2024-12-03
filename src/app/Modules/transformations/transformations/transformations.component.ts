import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransformationsService } from '../../../Services/transformations.service';

@Component({
  selector: 'app-transformations',
  templateUrl: './transformations.component.html',
  styleUrls: ['./transformations.component.css']
})
export class TransformationComponent implements OnInit {
  personajes: string[] = ['goku', 'vegeta', 'piccolo', 'freezer', 'zarbon', 'gohan'];
  currentCharacter!: string;
  editForm: FormGroup;
  prevLock: boolean = false;
  nextLock: boolean = false;
  name: string | null = null;
  character!: any;
  modal: boolean = false;

  transformations = signal<any[]>([]);

  constructor(
    private router: ActivatedRoute,
    private transformationsService: TransformationsService,
    private fb: FormBuilder,
    private route: Router,
    private cdr: ChangeDetectorRef // Para forzar detección de cambios si es necesario
  ) {
    this.editForm = this.fb.group({
      ki: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z. ]+$')]]
    });
  }

  ngOnInit(): void {
    // Escuchar cambios en los parámetros de la ruta
    this.router.paramMap.subscribe(params => {
      this.name = params.get('name');
      this.currentCharacter = this.name ?? 'goku';
      this.loadTransformations();
    });
  }

  loadTransformations(): void {
    this.transformationsService.getTransformations().subscribe({
      next: (data) => {
        console.log(data);
        this.filterTransformations(data);
        this.cdr.detectChanges(); // Forzar detección de cambios si es necesario
      },
      error: (err) => {
        console.error('Error al obtener las transformaciones:', err);
      }
    });
  }

  OpenModal(id: number): void {
    this.modal = true;
    this.transformationsService.getTransformationsById(id).subscribe(
      data => {
        console.log(data);
        this.character = data;
      },
      e => console.log(e)
    );
  }

  closeModal(): void {
    this.modal = false;
  }

  changeCharacterNext(): void {
    const currentIndex = this.personajes.indexOf(this.currentCharacter);
    if (currentIndex < this.personajes.length - 1) {
      const nextCharacter = this.personajes[currentIndex + 1];
      this.route.navigate(["transformations", nextCharacter]);
    } else {
      this.nextLock = true;
    }
  }

  changeCharacterPrev(): void {
    const currentIndex = this.personajes.indexOf(this.currentCharacter);
    if (currentIndex > 0) {
      const prevCharacter = this.personajes[currentIndex - 1];
      this.route.navigate(["transformations", prevCharacter]);
    } else {
      this.prevLock = true;
    }
  }

  saveKi(transformation: any): void {
    transformation.ki = this.editForm.value.ki;
    console.log(`Ki actualizado para ${transformation.name}: ${transformation.ki}`);
  }

  filterTransformations(data: any[]): void {
    this.transformations.set(
      data.filter(t => t.name.toLowerCase().includes(this.name?.toLowerCase() ?? ''))
    );
  }
}
