# Monte Carlo Simulation - Angular Application

An interactive Angular application that demonstrates the Monte Carlo method for estimating π (pi) using randomized algorithms. This project visualizes how random sampling can be used to approximate mathematical constants.

## 🎯 About the Project

This application implements a Monte Carlo simulation that estimates the value of π by randomly generating points in a unit square and determining how many fall within a quarter circle. The ratio of points inside the circle to total points, multiplied by 4, approximates π.

### Key Features

- **Real-time Visualization**: Watch as random points are plotted on a canvas, colored based on whether they fall inside or outside the quarter circle
- **Interactive Controls**: Adjust the number of points and animation speed
- **Live Statistics**: See the estimated value of π, actual value, error percentage, and point counts update in real-time
- **Two Simulation Modes**:
  - **Animated Mode**: Visualize the simulation step-by-step
  - **Instant Mode**: Run the full simulation immediately for larger datasets

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone or navigate to this repository
2. Install dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🎮 How to Use

1. **Set Number of Points**: Choose how many random points to generate (100 to 1,000,000)
2. **Adjust Animation Speed**: Control how many points are drawn per frame (1-100)
3. **Start Animation**: Watch the simulation run in real-time
4. **Run Instantly**: Execute the full simulation immediately (useful for large datasets)
5. **Stop**: Pause the animation at any time
6. **Reset**: Clear the canvas and start over

## 📊 Understanding the Algorithm

The Monte Carlo method works by:

1. Generating random points (x, y) in a unit square [0, 1] × [0, 1]
2. Checking if each point falls within a quarter circle (x² + y² ≤ 1)
3. Calculating the ratio: π ≈ 4 × (points inside circle / total points)

As more points are generated, the estimate converges toward the actual value of π.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── monte-carlo-simulation/    # Main simulation component
│   │   ├── monte-carlo-simulation.component.ts
│   │   ├── monte-carlo-simulation.component.html
│   │   └── monte-carlo-simulation.component.css
│   ├── services/
│   │   └── monte-carlo.service.ts  # Core algorithm implementation
│   ├── app.ts                       # Root component
│   └── app.routes.ts               # Application routing
└── ...
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) testing framework, run:

```bash
ng test
```

## 📚 Learn More

- [Angular Documentation](https://angular.dev)
- [Monte Carlo Method](https://en.wikipedia.org/wiki/Monte_Carlo_method)
- [Estimating Pi Using Monte Carlo](https://en.wikipedia.org/wiki/Monte_Carlo_method#History)

## 📝 License

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.
