const DirectoryTree = require('./DirectoryTree');

const directoryTree = new DirectoryTree();

class CommandLineHandler {
  static processCommand(line) {
    const parts = line.split(' ');
    const command = parts[0];
    const path = parts.slice(1).join(' ');

    switch (command.toUpperCase()) {
      case 'CREATE':
        directoryTree.createDirectory(path);
        break;
      case 'MOVE':
        // eslint-disable-next-line no-case-declarations
        const destination = parts[2];
        directoryTree.moveDirectory(path, destination);
        break;
      case 'DELETE':
        directoryTree.deleteDirectory(path);
        break;
      case 'LIST':
        directoryTree.listDirectories();
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`Invalid command: ${command}`);
    }
  }
}

module.exports = new CommandLineHandler();
