const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const MilitaryType = require('./models/militaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {
    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        return this.getPassengerPlanes().reduce((maxPlane, plane) => 
            plane.getPassengersCapacity() > maxPlane.getPassengersCapacity() ? plane : maxPlane
        );
    }

    getTransportMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === MilitaryType.transport);
    }

    getBomberMilitaryPlanes() {
        return this.getMilitaryPlanes().filter(plane => plane.getMilitaryType() === MilitaryType.bomber);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    sortByMaxDistance() {
        this.planes.sort((a, b) => a.getMaxFlightDistance() - b.getMaxFlightDistance());
        return this;
    }

    sortByMaxSpeed() {
        this.planes.sort((a, b) => a.getMaxSpeed() - b.getMaxSpeed());
        return this;
    }

    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => a.getMaxLoadCapacity() - b.getMaxLoadCapacity());
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static print(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;