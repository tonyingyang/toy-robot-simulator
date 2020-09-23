export default class Robot {
  private isPlaced: boolean;
  private xCoor!: number;
  private yCoor!: number;
  private direction!: string;
  private tableDim: number;
  private maxIndex!: number;
  static validDirections = ["NORTH", "EAST", "SOUTH", "WEST"];

  constructor(tableDim: number = 5) {
      this.isPlaced = false;
      this.tableDim = tableDim;
      this.maxIndex = this.tableDim - 1;
      console.log(`Created Robot to be placed on a ${this.tableDim}x${this.tableDim} table.`);
      console.log(`
        4 |   |   |   |   |   |
        3 |   |   |   |   |   |
        2 |   |   |   |   |   |
        1 |   |   |   |   |   |
        0 |   |   |   |   |   |
          ---------------------
            0   1   2   3   4  
        `);
  }

  place = async (xCoor: number, yCoor: number, direction: string) => {
    // console.log(`Placing robot in { x: ${xCoor} y: ${yCoor} direction: ${direction} }...`);
    if (!Robot.validDirections.includes(direction)) {
        return "Invalid direction";
    }
    if (xCoor > this.maxIndex || yCoor > this.maxIndex || xCoor < 0 || yCoor < 0) {
        return "Invalid coordinates";
    }
    this.xCoor = xCoor;
    this.yCoor = yCoor;
    this.direction = direction;
    this.isPlaced = true;
    return "Success!";
  }

  report = async () => {
    // console.log(`Reporting robot details...`);
    if (this.isPlaced == false) {
        return "Robot is not on the table";
    }
    return `${this.xCoor},${this.yCoor},${this.direction}`;
  }

  move = async () => {
    // console.log(`Moving robot...`);
    if (this.isPlaced == false) {
        return "Robot is not on the table";
    }
    switch (this.direction) {
        case "NORTH":
            if (this.yCoor < this.maxIndex) {
                this.yCoor +=1;
                return "Success!";
            }
            return "Invalid move";
        case "SOUTH":
                if (this.yCoor > 0) {
                    this.yCoor -=1;
                    return "Success!";
                }
                return "Invalid move";
        case "EAST":
                if (this.xCoor < this.maxIndex) {
                    this.xCoor +=1;
                    return "Success!";
                }
                return "Invalid move";
        case "WEST":
                if (this.xCoor > 0) {
                    this.xCoor -=1;
                    return "Success!";
                }
                return "Invalid move";
        default:
            return "Invalid direction";
    }
  }

  left = async () => {
    // console.log(`Facing robot to the left...`);
    if (this.isPlaced == false) {
        return "Robot is not on the table";
    }
    var currIndexDir: number = Robot.validDirections.indexOf(this.direction);
    var newIndexDir: number = currIndexDir-1 >= 0 ? currIndexDir-1 : Robot.validDirections.length-1;
    this.direction = Robot.validDirections[newIndexDir];
    return "Success!";
  }

  right = async () => {
    // console.log(`Facing robot to the right...`);
    if (this.isPlaced == false) {
        return "Robot is not on the table";
    }
    var currIndexDir: number = Robot.validDirections.indexOf(this.direction);
    var newIndexDir: number = currIndexDir+1 <= Robot.validDirections.length-1 ? currIndexDir+1 : 0;
    this.direction = Robot.validDirections[newIndexDir];
    return "Success!";
  }
}
