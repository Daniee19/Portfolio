import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../skills/skills.data';
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

  //Copia inicial
  filters = {
    frontend: [...SKILLS.frontend],
    backend: [...SKILLS.backend],
    tools: [...SKILLS.tools]
  };

  //ORIGINAL
  allProjects = [
    { name: 'Project 1', tecnologias: ["Java"], description: 'Description of project 1', link: '#' },
    { name: 'Project 2', tecnologias: ["Javascript", "HTML", "CSS"], description: 'Description of project 2', link: '#' },
    { name: 'Project 3', tecnologias: ["React", "Next.js", "Javascript", "HTML", "CSS"], description: 'Description of project 3', link: '#' }
  ];

  


  //LO QUE SE MUESTRA EN PANTALLA
  projects = [...this.allProjects];

  applyFilters() {
    //Si no hay filtros seleccionados, mostrar todos los proyectos
    if (this.selectedTechnologies.length === 0) {
      return this.projects = [...this.allProjects];
    }

    //Si está por ejemplo Java en selectedTechnologies y un proyecto tiene Java, entonces se muestra
    //Sino no se muestra porque va a buscar en el selectedTechnologies y daría false, ya que se usa un some para verificarlo
    const selectedNames = this.selectedTechnologies.map(skill => skill.name);

    return this.projects = this.allProjects.filter(project =>
      project.tecnologias.some(tech => selectedNames.includes(tech))
    );
  }

  selectFilter(skill: Skill) {
    // Se está creando un nuevo array sin el skill seleccionado
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