const GlobalState: { [index: string]: any } = {
    boids: {
        amount: 30,
        cohesion: 1,
        alignment: 1,
        seperation: 1,
        fov: 360,
        viewDistance: 130,
        showFov: false,
        showVelocity: false,
        showAlignment: false,
        showCohesion: false,
        showSeperation: false
    }
}

export default GlobalState;