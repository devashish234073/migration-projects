import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelloComponent } from './components/hello/hello.component';
import { GenderDisplayComponent } from './components/gender-display/gender-display.component';
import { ApiDemoComponent } from './components/api-demo/api-demo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HelloComponent, GenderDisplayComponent, ApiDemoComponent],
  template: `
    <h1>Angular 2+ App</h1>
    <app-hello [name]="'Devashish'"></app-hello>
    <app-gender-display [(gender)]="selectedGender"></app-gender-display>
    <app-api-demo [name]="'Devashish'"></app-api-demo>
  `,
  styles: [`
    :host {
      font-family: Arial, sans-serif;
      padding: 20px;
      display: block;
    }
  `]
})
export class AppComponent {
  selectedGender = 'male';
}
