const Plane = require('./Plane');

class MyPlane extends Plane {
    constructor(model, maxSpeed, maxFlightDistance, maxLoadCapacity) {
        super(model, maxSpeed, maxFlightDistance, maxLoadCapacity);
    }
}

// TODO: Implement additional methods or properties later

module.exports = MyPlane;