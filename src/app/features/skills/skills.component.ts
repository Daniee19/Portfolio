import { Component } from '@angular/core';
import { SKILLS } from './skills.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  inicial = "frontend";

  setCategory(category: string) {
    this.inicial = category;
  }

  skills = SKILLS;
}
