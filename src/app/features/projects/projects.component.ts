import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../skills/skills.data';
import { PROJECTS } from './projects.data';
type SkillCategory = 'frontend' | 'backend' | 'tools';
interface Skill {
  name: string;
  level?: string;
  url?: string;
  category: SkillCategory;
}

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

  /*INICIALIZACIÓN */
  selectedTechnologies: Skill[] = [];
  constructor() {
    console.log('🆕 componente creado');
  }
  //ORIGINAL
  allProjects = PROJECTS.allProjects;
  allNombresTecnologias = this.allProjects.flatMap(project => project.tecnologias);

  //Copia inicial de SKILLS
  filters = {
    frontend: [...SKILLS.frontend.filter(comparando => this.allNombresTecnologias.includes(comparando.name))],
    backend: [...SKILLS.backend.filter(comparando => this.allNombresTecnologias.includes(comparando.name))],
    tools: [...SKILLS.tools.filter(comparando => this.allNombresTecnologias.includes(comparando.name))]
  };

  //LO QUE SE MUESTRA EN PANTALLA
  //Copia de todos los proyectos
  projects = [...this.allProjects];

  applyFilters() {
    //Si no hay filtros seleccionados, mostrar todos los proyectos
    if (this.selectedTechnologies.length === 0) {
      return this.projects = [...this.allProjects];
    }

    //Si está por ejemplo Java en selectedTechnologies y un proyecto tiene Java, entonces se muestra
    //Sino no se muestra porque va a buscar en el selectedTechnologies y daría false, ya que se usa un some para verificarlo
    const selectedNames = this.selectedTechnologies.map(skill => skill.name);

    //* Se recorre la lista original de proyectos y se filtran aquellos
    //* cuya lista de tecnologías contenga al menos una tecnología seleccionada por el usuario

    
    //? Es decir que si el this.allProjects.filter(project => es "true") entonces se sigue manteniento, y si es false se oculta, esta es otra forma, en lugar de hacer la comparación * filter(s => s !== skill) * que es similar en cuanto a logica de true o false
    return this.projects = this.allProjects.filter(project =>
      project.tecnologias.some(tech => selectedNames.includes(tech))
    );
  }

  selectFilter(skill: Skill) {
    // Se está creando un nuevo array sin el skill seleccionado //Si son diferentes que se muestre, sino que se borre
    this.filters[skill.category] = this.filters[skill.category].filter(s => s !== skill);
    this.selectedTechnologies.push(skill);

    this.applyFilters();
  }

  unSelectedFilter(skill: Skill) {
    //Quitar lo seleccionado
    this.selectedTechnologies =
      this.selectedTechnologies.filter(s => s.name !== skill.name);

    //Devolverlo a su lista
    this.filters[skill.category].push(skill);
    this.filters[skill.category].sort((a, b) => a.name.localeCompare(b.name));

    this.applyFilters();

  };
}