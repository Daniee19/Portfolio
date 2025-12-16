import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../skills/skills.data';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  defecto = true;

  setBurger() {
    this.defecto = !this.defecto;
  }

  filters = SKILLS;
  projects = [
    { name: 'Project 1', description: 'Description of project 1', link: '#' },
    { name: 'Project 2', description: 'Description of project 2', link: '#' },
    { name: 'Project 3', description: 'Description of project 3', link: '#' }
  ];

  selectFilter(filter: string) {

    /*Con esto removemos los lenguajes/frameworks seleccionados*/
    this.filters.frontend = this.filters.frontend.filter(skill => skill.name !== filter);
    const elementoSeleccionado = document.createElement("div");
    elementoSeleccionado.innerText = filter;

    document.getElementById("filtros_seleccionados")?.appendChild(elementoSeleccionado);

    this.filters.backend = this.filters.backend.filter(skill => skill.name !== filter);
    this.filters.tools = this.filters.tools.filter(skill => skill.name !== filter);
  }

  // onFilterChange(event: any) {
  //   console.log('Filter changed:', event.target.value);
  // }
}