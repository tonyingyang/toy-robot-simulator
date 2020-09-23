const assert = require('assert');
import Robot from '../robot';

var robot = new Robot();

describe('Running commands when robot is not yet placed on the table', () => {
    it('REPORT - return not on table', async () => {
        assert.equal(await robot.report(), "Robot is not on the table");
    });
    it('MOVE - return not on table', async () => {
        assert.equal(await robot.move(), "Robot is not on the table");
    });
    it('LEFT - return not on table', async () => {
        assert.equal(await robot.left(), "Robot is not on the table");
    });
    it('RIGHT - return not on table', async () => {
        assert.equal(await robot.right(), "Robot is not on the table");
    });
});

describe('Invalid PLACE command', () => {
    it('X coordinate > table dimension - return invalid coordinates', async () => {
        assert.equal(await robot.place(5,0,"NORTH"), "Invalid coordinates");
    });
    it('Y coordinate > table dimension - return invalid coordinates', async () => {
        assert.equal(await robot.place(0,5,"NORTH"), "Invalid coordinates");
    });
    it('X coordinate < 0 - return invalid coordinates', async () => {
        assert.equal(await robot.place(-1,0,"NORTH"), "Invalid coordinates");
    });
    it('Y coordinate < 0 - return invalid coordinates', async () => {
        assert.equal(await robot.place(0,-1,"NORTH"), "Invalid coordinates");
    });
    it('Incorrect direction - return invalid direction', async () => {
        assert.equal(await robot.place(0,0,"DIRECTION"), "Invalid direction");
    });
});

describe('Successful Robot Simulation', () => {
    it('PLACE 1,2,NORTH - return success', async () => {
        assert.equal(await robot.place(1,2,"NORTH"), "Success!");
    });
    it('MOVE - return success', async () => {
        assert.equal(await robot.move(), "Success!");
    });
    it('REPORT - return updated coordinate - 1,3,NORTH', async () => {
        assert.equal(await robot.report(), "1,3,NORTH");
    });
    it('RIGHT - return success', async () => {
        assert.equal(await robot.right(), "Success!");
    });
    it('REPORT - return updated direction - 1,3,EAST', async () => {
        assert.equal(await robot.report(), "1,3,EAST");
    });
    it('LEFT - return success', async () => {
        assert.equal(await robot.left(), "Success!");
    });
    it('REPORT - return updated direction - 1,3,NORTH', async () => {
        assert.equal(await robot.report(), "1,3,NORTH");
    });
});