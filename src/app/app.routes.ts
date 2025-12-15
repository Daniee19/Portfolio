import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SkillsComponent } from './features/skills/skills.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'skills', component: SkillsComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'contact', component: ContactComponent },

    { path: '**', redirectTo: 'home' }
];
