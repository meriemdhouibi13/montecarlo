import { Injectable } from '@angular/core';

export interface SimulationPoint {
  x: number;
  y: number;
  isInside: boolean;
}

export interface SimulationResult {
  totalPoints: number;
  insideCircle: number;
  estimatedPi: number;
  actualPi: number;
  error: number;
}

@Injectable({
  providedIn: 'root'
})
export class MonteCarloService {
  private readonly ACTUAL_PI = Math.PI;

  constructor() { }

  /**
   * Generate a random point in the unit square [0, 1] x [0, 1]
   */
  generateRandomPoint(): SimulationPoint {
    const x = Math.random();
    const y = Math.random();
    const distance = Math.sqrt(x * x + y * y);
    const isInside = distance <= 1;

    return { x, y, isInside };
  }

  /**
   * Run Monte Carlo simulation to estimate Pi
   * Algorithm: Generate random points in a unit square.
   * Count how many fall inside the quarter circle.
   * Pi ≈ 4 * (points inside circle / total points)
   */
  runSimulation(numberOfPoints: number): SimulationResult {
    let insideCircle = 0;

    for (let i = 0; i < numberOfPoints; i++) {
      const point = this.generateRandomPoint();
      if (point.isInside) {
        insideCircle++;
      }
    }

    const estimatedPi = (4 * insideCircle) / numberOfPoints;
    const error = Math.abs(((estimatedPi - this.ACTUAL_PI) / this.ACTUAL_PI) * 100);

    return {
      totalPoints: numberOfPoints,
      insideCircle,
      estimatedPi,
      actualPi: this.ACTUAL_PI,
      error
    };
  }

  /**
   * Run incremental simulation - useful for visualization
   */
  *runIncrementalSimulation(numberOfPoints: number): Generator<SimulationPoint> {
    for (let i = 0; i < numberOfPoints; i++) {
      yield this.generateRandomPoint();
    }
  }

  /**
   * Calculate current Pi estimate from accumulated points
   */
  calculatePiEstimate(totalPoints: number, insideCircle: number): number {
    if (totalPoints === 0) return 0;
    return (4 * insideCircle) / totalPoints;
  }

  /**
   * Calculate error percentage
   */
  calculateError(estimatedPi: number): number {
    return Math.abs(((estimatedPi - this.ACTUAL_PI) / this.ACTUAL_PI) * 100);
  }
}
