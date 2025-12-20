import { Component, OnInit } from '@angular/core';
import { SKILLS } from './skills.data';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {

  showTitle = false;
  showCategories = false;
  showSkills = false;

  ngOnInit(): void {
    setTimeout(() => this.showTitle= true, 100);
    setTimeout(() => this.showCategories= true, 250);
    setTimeout(() => this.showSkills= true, 400);
  }


  inicial = "frontend";


  ngAfterViewInit() {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }
  setCategory(category: string) {
    this.inicial = category;
  }


  //*Cuando el mouse toque una habilidad, esta se va a inclinar (como si estuviese flotando)
  onMouseMove(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    el.style.transform = `
    perspective(600px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    translateY(-4px)
  `;
  }

  onMouseLeave(event: MouseEvent) {
    const el = event.currentTarget as HTMLElement;
    el.style.transform = `
    perspective(600px)
    rotateX(0)
    rotateY(0)
    translateY(0)
  `;
  }

  skills = SKILLS;
}
