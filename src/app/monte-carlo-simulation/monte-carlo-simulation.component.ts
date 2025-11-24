import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MonteCarloService, SimulationPoint } from '../services/monte-carlo.service';

@Component({
  selector: 'app-monte-carlo-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monte-carlo-simulation.component.html',
  styleUrls: ['./monte-carlo-simulation.component.css']
})
export class MonteCarloSimulationComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D;
  private canvasSize = 400;
  private animationId?: number;
  
  // Simulation state
  numberOfPoints = 1000;
  speed = 10; // Points per frame
  isRunning = false;
  
  // Results
  totalPoints = 0;
  insideCircle = 0;
  estimatedPi = 0;
  actualPi = Math.PI;
  error = 0;
  
  constructor(private monteCarloService: MonteCarloService) {}

  ngOnInit(): void {
    this.initCanvas();
    this.drawCircle();
  }

  ngOnDestroy(): void {
    this.stopSimulation();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.canvasSize;
    canvas.height = this.canvasSize;
    this.ctx = canvas.getContext('2d')!;
  }

  private drawCircle(): void {
    this.ctx.strokeStyle = '#2196F3';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.canvasSize, 0, Math.PI / 2);
    this.ctx.stroke();
  }

  startSimulation(): void {
    if (this.isRunning) return;
    
    this.resetSimulation();
    this.isRunning = true;
    
    const generator = this.monteCarloService.runIncrementalSimulation(this.numberOfPoints);
    
    const animate = () => {
      if (!this.isRunning) return;
      
      let pointsDrawn = 0;
      
      while (pointsDrawn < this.speed) {
        const result = generator.next();
        
        if (result.done) {
          this.stopSimulation();
          return;
        }
        
        const point = result.value;
        this.drawPoint(point);
        this.totalPoints++;
        
        if (point.isInside) {
          this.insideCircle++;
        }
        
        pointsDrawn++;
      }
      
      this.updateResults();
      this.animationId = requestAnimationFrame(animate);
    };
    
    animate();
  }

  stopSimulation(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resetSimulation(): void {
    this.stopSimulation();
    this.totalPoints = 0;
    this.insideCircle = 0;
    this.estimatedPi = 0;
    this.error = 0;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.drawCircle();
  }

  runInstantSimulation(): void {
    this.resetSimulation();
    
    const result = this.monteCarloService.runSimulation(this.numberOfPoints);
    
    this.totalPoints = result.totalPoints;
    this.insideCircle = result.insideCircle;
    this.estimatedPi = result.estimatedPi;
    this.error = result.error;
    
    // Draw all points at once (sample visualization)
    for (let i = 0; i < Math.min(5000, this.numberOfPoints); i++) {
      const point = this.monteCarloService.generateRandomPoint();
      this.drawPoint(point);
    }
  }

  private drawPoint(point: SimulationPoint): void {
    const x = point.x * this.canvasSize;
    const y = point.y * this.canvasSize;
    
    this.ctx.fillStyle = point.isInside ? '#4CAF50' : '#F44336';
    this.ctx.fillRect(x - 1, y - 1, 2, 2);
  }

  private updateResults(): void {
    this.estimatedPi = this.monteCarloService.calculatePiEstimate(this.totalPoints, this.insideCircle);
    this.error = this.monteCarloService.calculateError(this.estimatedPi);
  }
}
