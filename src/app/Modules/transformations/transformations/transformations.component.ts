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
    private cdr: ChangeDetectorRef
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
      this.updateNavigationLocks();
    });
  }

  loadTransformations(): void {
    // Intentar cargar transformaciones desde LocalStorage
    const storedTransformations = localStorage.getItem('transformations');
    if (storedTransformations) {
      console.log('Cargando transformaciones desde LocalStorage...');
      const transformations = JSON.parse(storedTransformations);
      const filteredTransformations = transformations.filter((t: any) =>
        t.name.toLowerCase().includes(this.currentCharacter.toLowerCase())
      );
      this.transformations.set(filteredTransformations);
    } else {
      // Si no están en LocalStorage, obtenerlas del servicio
      this.transformationsService.getTransformations().subscribe({
        next: (data) => {
          console.log('Transformaciones cargadas desde el servicio:', data);
          localStorage.setItem('transformations', JSON.stringify(data)); // Guardar en LocalStorage
          const filteredTransformations = data.filter((t: any) =>
            t.name.toLowerCase().includes(this.currentCharacter.toLowerCase())
          );
          this.transformations.set(filteredTransformations);
        },
        error: (err) => {
          console.error('Error al obtener las transformaciones:', err);
        }
      });
    }
  }

  updateNavigationLocks(): void {
    const currentIndex = this.personajes.indexOf(this.currentCharacter);
    this.prevLock = currentIndex === 0; // Bloquear "Prev" si estamos en el primer personaje
    this.nextLock = currentIndex === this.personajes.length - 1; // Bloquear "Next" si estamos en el último personaje
  }
  

  OpenModal(id: number): void {
    this.modal = true;
    const selectedTransformation = this.transformations().find(t => t.id === id);

    if (selectedTransformation) {
      this.character = selectedTransformation;
      this.editForm.setValue({
        ki: selectedTransformation.ki
      });
    } else {
      console.error('Transformación no encontrada.');
    }
  }

  closeModal(): void {
    this.modal = false;
  }

  changeCharacterNext(): void {
    const currentIndex = this.personajes.indexOf(this.currentCharacter);
    if (currentIndex < this.personajes.length - 1) {
      const nextCharacter = this.personajes[currentIndex + 1];
      this.route.navigate(["transformations", nextCharacter]);
    }
    this.updateNavigationLocks(); // Verificar si es necesario bloquear botones
  }
  
  changeCharacterPrev(): void {
    const currentIndex = this.personajes.indexOf(this.currentCharacter);
    if (currentIndex > 0) {
      const prevCharacter = this.personajes[currentIndex - 1];
      this.route.navigate(["transformations", prevCharacter]);
    }
    this.updateNavigationLocks(); // Verificar si es necesario bloquear botones
  }
  

  saveKi(): void {
    if (!this.character) {
      console.error('No hay transformación cargada para guardar.');
      return;
    }

    // Actualizar el Ki de la transformación actual
    this.character.ki = this.editForm.value.ki;

    // Actualizar el objeto en LocalStorage
    const storedTransformations = JSON.parse(localStorage.getItem('transformations') || '[]');
    const index = storedTransformations.findIndex((t: any) => t.id === this.character.id);

    if (index !== -1) {
      storedTransformations[index] = this.character; // Actualizar transformación
    } else {
      storedTransformations.push(this.character); // Agregar nueva transformación si no existe
    }

    localStorage.setItem('transformations', JSON.stringify(storedTransformations));
    console.log('Transformaciones actualizadas en LocalStorage:', storedTransformations);

    // Refrescar la lista visible
    this.loadTransformations();

    this.closeModal(); // Cerrar el modal después de guardar
  }
}
