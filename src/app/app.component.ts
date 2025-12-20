import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio-angular';

  bubbles: HTMLElement[] = [];
  positions: { x: number; y: number }[] = [];
  maxBubbles = 6;

  ngAfterViewInit() {
    const layer = document.querySelector('.bubble-layer') as HTMLElement;
    if (!layer) return;

    // Crear burbujas
    for (let i = 0; i < this.maxBubbles; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      layer.appendChild(bubble);

      this.bubbles.push(bubble);
      this.positions.push({ x: 0, y: 0 });
    }

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      // La primera sigue al mouse
      this.positions[0].x += (mouseX - this.positions[0].x) * 0.25;
      this.positions[0].y += (mouseY - this.positions[0].y) * 0.25;

      // Las demás siguen a la anterior
      for (let i = 1; i < this.positions.length; i++) {
        this.positions[i].x += (this.positions[i - 1].x - this.positions[i].x) * 0.25;
        this.positions[i].y += (this.positions[i - 1].y - this.positions[i].y) * 0.25;
      }

      // Render
      this.bubbles.forEach((bubble, i) => {
        bubble.style.left = `${this.positions[i].x}px`;
        bubble.style.top = `${this.positions[i].y}px`;
        bubble.style.opacity = `${1 - i * 0.12}`;
        bubble.style.transform = `
        translate(-50%, -50%)
        scale(${1 - i * 0.08})
      `;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

}
