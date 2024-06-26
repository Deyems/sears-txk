const process = require('process');
const readline = require('readline');
const { processCommand } = require('./src/modules/directory-api/commandLineHandler');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  processCommand(input.trim());
});

// eslint-disable-next-line no-console
console.log(
  'Enter commands (e.g., CREATE fruits/apples, MOVE fruits/apples foods, DELETE fruits/apples, LIST). Press Ctrl+C to exit.',
);
