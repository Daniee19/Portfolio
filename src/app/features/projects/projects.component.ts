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
  constructor() {
    console.log('🆕 componente creado');
  }
  defecto = true;

  setBurger() {
    this.defecto = !this.defecto;
  }

  /*INICIALIZACIÓN */
  selectedTechnologies: Skill[] = [];

  //*PROJECTS ORIGINAL DATA (para no perder la info)
  allProjects = PROJECTS.allProjects;
  //* Unir todas las tecnologías de todos los proyectos en un solo array
  allNombresTecnologias = this.allProjects.flatMap(project => project.tecnologias);

  //*Copia inicial de SKILLS
  //!Comparar con las tecnologías usadas en los proyectos y filtrar solo las que se usan en los proyectos
  //? Filters permitirá manejar tanto la sección de abajo de filtros disponibles como la de filtros seleccionados
  //? Inicialmente, todos los filtros están disponibles, por lo que se copian todos los skills que coinciden con las tecnologías usadas en los proyectos
  //* Filters primero tiene todas las tecnologías disponibles, y a medida que se seleccionan, se van quitando de aquí y se agregan a selectedTechnologies
  filters = {
    frontend: [...SKILLS.frontend.filter(s => this.allNombresTecnologias.includes(s.name))],
    backend: [...SKILLS.backend.filter(s => this.allNombresTecnologias.includes(s.name))],
    tools: [...SKILLS.tools.filter(s => this.allNombresTecnologias.includes(s.name))]
  };

  //LO QUE SE MUESTRA EN PANTALLA
  //? Copia de todos los proyectos
  projects = [...this.allProjects];

  deleteAllFilters() {
    //Se resetean los filtros a su estado inicial
    this.filters = {
      frontend: [...SKILLS.frontend.filter(s => this.allNombresTecnologias.includes(s.name))],
      backend: [...SKILLS.backend.filter(s => this.allNombresTecnologias.includes(s.name))],
      tools: [...SKILLS.tools.filter(s => this.allNombresTecnologias.includes(s.name))]
    };
    this.selectedTechnologies = [];
    this.applyFilters();
  }

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