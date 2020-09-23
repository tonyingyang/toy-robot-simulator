import * as readline from 'readline';
import Robot from './robot';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "ROBOT SIMULATOR> ",
});

const commandsText = `Please input any of the ff valid commands:
  PLACE X,Y,F
    -> F can be [NORTH, EAST, SOUTH, WEST]
  MOVE
  LEFT
  RIGHT
  REPORT
  EXIT`

// rl.question('What will be the dimension of the square table', (answer) => {
//   if (!isNaN(parseInt(answer,10))) {
//     let robot = new Robot(parseInt(answer,10));
//   }
// });

let robot = new Robot();
console.log(commandsText);
rl.prompt();

rl.on('line', async (line) => {
  switch (line.trim().toUpperCase()) {
    case 'REPORT':
      console.log(await robot.report());
      break;

    case 'MOVE':
        console.log(await robot.move());
        break;

    case 'LEFT':
        console.log(await robot.left());
        break;

    case 'RIGHT':
        console.log(await robot.right());
        break;

    case 'EXIT':
        rl.close();

    default:
      let cmd = line.trim().toUpperCase().split(" ");
      if (cmd.length === 2 && cmd[0] === 'PLACE') {
        let coords = cmd[1].toUpperCase().split(",");
        if (!isNaN(parseInt(coords[0],10)) && !isNaN(parseInt(coords[1],10))) {
          console.log(await robot.place(parseInt(coords[0],10),parseInt(coords[1]),coords[2]));
          break;
        }
      }
      console.log(commandsText);
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Thanks for playing!');
  process.exit(0);
});
