import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SKILLS } from '../skills/skills.data';
import { PROJECTS } from './projects.data';

// Importar funciones de animación si es necesario
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

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
  styleUrl: './projects.component.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('.project-card', [
          style({
            opacity: 0,
            transform: 'translateY(15px) scale(.95)'
          }),
          stagger(120, [
            animate(
              '600ms cubic-bezier(0.22, 1, 0.36, 1)',
              style({
                opacity: 1,
                transform: 'translateY(0) scale(1)'
              })
            )
          ])
        ], { optional: true })
      ])
    ])
  ]
})


export class ProjectsComponent implements OnInit {
  //Desplazar
  showHeader = false;
  showAvailableTitleFilter = false;
  showLine = false;
  showLi = false;
  showProjects = false;
  //Agrandar
  showTitleProject = false;
  ngOnInit(): void {
    setTimeout(() => this.showTitleProject = true, 280)
    setTimeout(() => this.showHeader = true, 300);
    setTimeout(() => this.showAvailableTitleFilter = true, 450);
    setTimeout(() => this.showLi = true, 550);
    setTimeout(() => this.showProjects = true, 650);

    setTimeout(() => this.showLine = true, 350);
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

  //LO QUE SE MUESTRA EN PANTALLA
  //? Copia de todos los proyectos
  projects = [...this.allProjects];

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

  //Actualizar los filtros disponibles según los proyectos visibles
  updateAvailableFilters() {
    // 1. Obtener tecnologías usadas SOLO en proyectos visibles
    const techSet = new Set<string>();

    //*Esto es vital, porque si borro todos los filtros -> tendré todos los proyectos -> y por ende todas las tecnologías
    this.projects.forEach(project =>
      project.tecnologias.forEach(tech => techSet.add(tech))
    );

    // 2. Refiltrar SKILLS según ese set
    //Practicamente lo clave aquí es el has() que verifica si el nombre de la tecnologia de los proyectos 
    //*Practicamente es el texto de tecnologías en vertical que se muestra al lado izquierdo
    //Esto cambia cada vez que se aplica un filtro
    this.filters = {
      frontend: SKILLS.frontend.filter(
        s =>
          techSet.has(s.name) &&
          !this.selectedTechnologies.some(sel => sel.name === s.name)
      ),
      backend: SKILLS.backend.filter(
        s =>
          techSet.has(s.name) &&
          !this.selectedTechnologies.some(sel => sel.name === s.name)
      ),
      tools: SKILLS.tools.filter(
        s =>
          techSet.has(s.name) &&
          !this.selectedTechnologies.some(sel => sel.name === s.name)
      )
    };
  }

  applyFilters() {
    //*Si no hay filtros seleccionados, mostrar todos los proyectos
    if (this.selectedTechnologies.length === 0) {
      this.projects = [...this.allProjects];
      return this.updateAvailableFilters();
    }

    //*AND incremental
    //? Es decir que si el this.allProjects.filter(project => es "true") entonces se sigue manteniento, y si es false se oculta, esta es otra forma, en lugar de hacer la comparación * filter(s => s !== skill) * que es similar en cuanto a logica de true o false
    this.projects = this.allProjects.filter(project =>
      //*Array chico 
      this.selectedTechnologies.every(sel =>
        //*Array grande
        project.tecnologias.includes(sel.name))
    )

    return this.updateAvailableFilters();
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