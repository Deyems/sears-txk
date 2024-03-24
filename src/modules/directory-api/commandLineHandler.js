const directoryTree = require("./DirectoryTree");

class CommandLineHandler{

    processCommand(line){
      const parts = line.split(" ");
      const command = parts[0];
      let path = parts.slice(1).join(" ");
    
      switch (command.toUpperCase()) {
        case "CREATE":
          directoryTree.createDirectory(path);
          break;
        case "MOVE":
          const destination = parts[2];
          directoryTree.moveDirectory(path, destination);
          break;
        case "DELETE":
          directoryTree.deleteDirectory(path);
          break;
        case "LIST":
          directoryTree.listDirectories();
          break;
        default:
          console.log("Invalid command: " + command);
      }
    };
}

module.exports = new CommandLineHandler();