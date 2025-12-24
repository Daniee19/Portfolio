import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocialsComponent } from '../../shared/components/socials/socials.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SocialsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showTitle = false;
  showSubtitle = false;
  showList = false;
  showActions = false;
  showImage = false;
  showSocials = false;

  ngOnInit() {
    setTimeout(() => this.showTitle = true, 100);
    setTimeout(() => this.showSubtitle = true, 250);
    setTimeout(() => this.showList = true, 400);
    setTimeout(() => this.showActions = true, 550);
    setTimeout(() => this.showImage = true, 700);
    setTimeout(() => this.showSocials = true, 600);
  }
  @ViewChild('heroImageLarge') heroImageLarge?: ElementRef;

  ngAfterViewInit() {
    window.addEventListener('mousemove', this.onMouseMove)
  }
  onMouseMove = (e: MouseEvent) => {
    if (!this.heroImageLarge) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;

    this.heroImageLarge.nativeElement.style.transform =
      `translate(${x}px, ${y}px)`;
  };

  //Útil para producción
  ngOnDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  cv: string = 'assets/docs/CV-Daniel-Castaneda-Ing-Sistemas.pdf';
}
