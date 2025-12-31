import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gender-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="row">
        <label>Gender:</label>
        <select id="genderSelect" [(ngModel)]="gender" (change)="onGenderChange()">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <span>{{ gender }}</span>
      </div>
    </div>
  `,
  styles: [`
    .card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-top: 1rem;
    }
    .row {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    label {
      font-weight: 600;
    }
    select {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class GenderDisplayComponent {
  @Input() gender: string = 'male';
  @Output() genderChange = new EventEmitter<string>();

  onGenderChange() {
    this.genderChange.emit(this.gender);
  }
}
