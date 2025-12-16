import { Component } from '@angular/core';
import { SocialsComponent } from '../../shared/components/socials/socials.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SocialsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cv: string = '../../../assets/docs/CV-Daniel-Castaneda-Ing-Sistemas.pdf';
}
