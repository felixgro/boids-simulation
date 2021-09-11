# boids-simulation
Implementation of Craig Raynold’s boids algorithm written in Typescript.
[_See Demo_](https://felixgro.github.io/boids-simulation/)

## Boid.. what?
The Boid (bird-oid object) alogrithm simulates flocking behaviour of birds & was originally developed by Craig Raynolds in 1986.

In the original implementation each Boid makes decicions based on the following 3 rules:
- **Alignment:** Boids try to change their position in order to correspond with the average alignment of other Boids within it’s view.
- **Cohesion:** Each Boid attempts to move towards the average position of other Boids within it’s view.
- **Seperation:** Each Boid attempts to maintain a reasonable amount of distance between itself and any nearby Boids in order to prevent overcrowding.

## Setup
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation
Download the project using git:
```bash
git clone https://github.com/felixgro/boids-simulation.git
cd boids-simulation
```

Install Dependencies and build using yarn or npm:
```bash
npm i
# or
yarn

npm run build
# or
yarn build
```
