const { assert } = require('chai');

const Plane = require('../Planes/Plane');
const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const MilitaryType = require('../models/militaryType');
const experimentalPlane = require('../Planes/ExperimentalPlane');
const ExperimentalTypes = require('../models/experimentalTypes');
const ClassificationLevel = require('../models/classificationLevel');

describe('My Test', () => {
    let planes;
    let planeWithMaxPassengerCapacity;

    beforeEach(() => {
        planes = [
            new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
            new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
            new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
            new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
            new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
            new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
            new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
            new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
            new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, MilitaryType.bomber),
            new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, MilitaryType.bomber),
            new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, MilitaryType.bomber),
            new MilitaryPlane('F-15', 1500, 12000, 10000, MilitaryType.fighter),
            new MilitaryPlane('F-22', 1550, 13000, 11000, MilitaryType.fighter),
            new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, MilitaryType.transport),
            new experimentalPlane("Bell X-14", 277, 482, 500, ExperimentalTypes.highAltitude, ClassificationLevel.secret),
            new experimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, ExperimentalTypes.vtol, ClassificationLevel.topSecret)
        ];
        planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);
    });

    it('should have military planes with transport type', () => {
        const airport = new Airport(planes);
        const transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        const hasTransportMilitaryPlanes = transportMilitaryPlanes.some(militaryPlane =>
            militaryPlane.getMilitaryType() === MilitaryType.transport
        );
        assert.isTrue(hasTransportMilitaryPlanes);
    });

    it('should check passenger plane with max capacity', () => {
        const airport = new Airport(planes);
        const expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.notStrictEqual(expectedPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
    });

    it('should test if planes are sorted by max load capacity', () => {
        console.log("TEST testGetPassengerPlaneWithMaxCapacity started!");
        const airport = new Airport(planes);
        airport.sortByMaxLoadCapacity();
        const planesSortedByMaxLoadCapacity = airport.getPlanes();
        const nextPlaneMaxLoadCapacityIsHigherThanCurrent = planesSortedByMaxLoadCapacity.every((plane, index) =>
            index === planesSortedByMaxLoadCapacity.length - 1 || plane.getMaxLoadCapacity() <= planesSortedByMaxLoadCapacity[index + 1].getMaxLoadCapacity()
        );
        assert.isTrue(nextPlaneMaxLoadCapacityIsHigherThanCurrent);
    });

    it('should check if there is at least one bomber in military planes', () => {
        const airport = new Airport(planes);
        const bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        const hasBomberMilitaryPlanes = bomberMilitaryPlanes.some(militaryPlane =>
            militaryPlane.getMilitaryType() === MilitaryType.bomber
        );
        assert.isTrue(hasBomberMilitaryPlanes);
    });

    it('should check that experimental planes have a classification level higher than unclassified', () => {
        const airport = new Airport(planes);
        const experimentalPlanes = airport.getExperimentalPlanes();
        const hasUnclassifiedPlanes = experimentalPlanes.some(experimentalPlane =>
            experimentalPlane.getClassificationLevel() === ClassificationLevel.unclassified
        );
        assert.isFalse(hasUnclassifiedPlanes);
    });
});