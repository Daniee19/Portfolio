import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environments';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  showTitle = false;
  showName = false;
  showEmail = false;
  showTitleTopic = false;
  showOptionButton = false;
  showContactDetails = false;
  showContactLast = false;

  options = [
    "Website design", "Backend development", "Full Stack development", "Other"
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

    setTimeout(() => this.showTitle = true, 100);
    setTimeout(() => this.showName = true, 250);
    setTimeout(() => this.showEmail = true, 300);
    setTimeout(() => this.showTitleTopic = true, 350);
    setTimeout(() => this.showOptionButton = true, 450);
    setTimeout(() => this.showContactDetails = true, 500);
    setTimeout(() => this.showContactLast = true, 600);

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      topic: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.contactForm.invalid) return;

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      topic: this.contactForm.value.topic
    };

    emailjs.send(
      environment.emailJsServiceId,
      environment.emailJsTemplateId,
      templateParams,
      environment.emailJsPublicKey
    )
      .then(() => {
        alert('Message sent successfully!');
        this.contactForm.reset();
      })
      .catch(() => {
        alert('Something went wrong. Try again.');
      });
  }

}
