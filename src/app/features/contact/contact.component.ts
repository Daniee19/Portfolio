import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  options = [
    "Website design", "Backend development", "Full Stack developmente", "Other"
  ]

  selectOption(option: string) {
    //*Se le asigna un valor que antes era null
    this.contactForm.get('topic')?.setValue(option);
    this.contactForm.get('topic')?.markAsTouched();
  }

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    message: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required)
  })

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      topic: ['', Validators.required]
    })
  }
  onSubmit() {
    alert('Form submitted!');
  }

}
