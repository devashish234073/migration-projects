import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hello',
  standalone: true,
  template: `
    <div class="card">
      <strong>Angular: Hello {{ name }}</strong>
    </div>
  `,
  styles: [`
    .card {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-top: 1rem;
    }
  `]
})
export class HelloComponent {
  @Input() name: string = '';
}
