import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GreetingService, GreetingResponse } from '../../services/greeting.service';

@Component({
  selector: 'app-api-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="row">
        <label>API greeting</label>
        <span *ngIf="status === 'loading'">Loading...</span>
        <span *ngIf="status === 'success'">
          {{ greeting.message }} <small>{{ greeting.time }}</small>
        </span>
        <span *ngIf="status === 'error'">Error: {{ error }}</span>
        <button (click)="fetchGreeting()">Fetch Greeting</button>
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
    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class ApiDemoComponent implements OnInit {
  @Input() name: string = '';

  status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  greeting: GreetingResponse = { message: '', time: '' };
  error: string = '';

  constructor(private greetingService: GreetingService) { }

  ngOnInit() {
    this.fetchGreeting();
  }

  fetchGreeting() {
    if (!this.name) return;
    
    this.status = 'loading';
    this.greetingService.getGreeting(this.name).subscribe({
      next: (response) => {
        this.greeting = response;
        this.status = 'success';
      },
      error: (err) => {
        this.error = err.message;
        this.status = 'error';
      }
    });
  }
}
