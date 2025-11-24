import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MonteCarloSimulationComponent } from './monte-carlo-simulation/monte-carlo-simulation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MonteCarloSimulationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Monte Carlo Simulation');
}
