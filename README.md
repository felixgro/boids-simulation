# Boids Flocking Simulation

My own implementation of the Boids-Algorithm featuring reproduction & predetors along with an instinctive UI to tweak relevant proterties.

[Live demo](https://boids-simulation.vercel.app/)

## Boid... what ?

The Boid (bird-oid object) Alogrithm simulates flocking behaviour of birds. It was originally developed by Craig Raynolds in 1986.

In the original implementation each Boid makes decicions based on 3 rules:
Rule | Description
------------- | -------------
Alignment | Boids try to change their position in order to correspond with the average alignment of other Boids within their view.
Cohesion | Every Boid attempts to move towards the average position of other boids within their view.
Seperation | Each Boid attempts to maintain a reasonable amount of distance between itself and any nearby Boids in order to prevent overcrowding.

[Online Ressource](https://www.red3d.com/cwr/boids/)
