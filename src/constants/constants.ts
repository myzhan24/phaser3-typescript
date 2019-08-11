export const Physics = {
    gravity: 0.8, // Y Acceleration downward
    airAccelMu: 0.5, // X Acceleration multiplier in the Air
    groundAccelMu: 1, // X Acceleration multiplier on the Ground
    airFrictionMu: 0.25, // X Deceleration multiplier in the Air
    groundFrictionMu: 2 // X Deceleration multiplier on the Ground
};

export const Player = {
    accel: 6, // Player base acceleration constant
    frictionAccel: 1, // Player base deceleration constant
    jumpSpeed: -14, // Speed applied when jumping
    maxRunSpeed: 8 // Max speed from user input
};

export const DudeConstants = {
    accel: 240, // Player base acceleration constant
    frictionAccel: 40, // Player base deceleration constant
    jumpSpeed: -560, // Speed applied when jumping
    maxRunSpeed: 320 // Max speed from user input
};

export const Platform = {
    accel: 3
};
