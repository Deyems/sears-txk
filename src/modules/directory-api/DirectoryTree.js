const DirectoryNode = require('./DirectoryNode');

class DirectoryTree {
  constructor() {
    this.root = new DirectoryNode('');
  }

  createDirectory(path) {
    const directories = path.split('/');
    let currentDir = this.root;
    // eslint-disable-next-line no-restricted-syntax
    for (const directory of directories) {
      // eslint-disable-next-line no-continue
      if (directory === '') continue;
      let child = currentDir.getChild(directory);
      if (!child) {
        child = new DirectoryNode(directory);
        currentDir.addChild(child);
      }
      // - reset the currDir to the child
      currentDir = child;
    }
  }

  moveDirectory(sourcePath, destinationPath) {
    const srcPath = sourcePath.split(' ')[0];
    const sourceParent = this.#findParentDirectory(srcPath);
    const directoryToMove = this.#findChildDirectory(srcPath);
    const destinationNode = this.#findChildDirectory(destinationPath);

    if (sourceParent && destinationNode) {
      if (directoryToMove) {
        sourceParent.removeChild(directoryToMove.name);
        destinationNode.addChild(directoryToMove);
        // eslint-disable-next-line no-console
        console.log(`MOVED ${srcPath} ${destinationPath}`);
      } else {
        // eslint-disable-next-line no-console
        console.log(`Cannot move ${srcPath} - source directory does not exist`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Cannot move ${destinationPath} - destination directory does not exist`,
      );
    }
  }

  deleteDirectory(path) {
    const parent = this.#findParentDirectory(path);
    if (parent) {
      const directoryName = path.split('/').pop();
      if (!parent.getChild(directoryName)) {
        // eslint-disable-next-line no-console
        console.log(`Cannot delete ${path} - directory does not exist`);
      } else {
        parent.removeChild(directoryName);
        // eslint-disable-next-line no-console
        console.log(`DELETE ${path}`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(`Cannot delete ${path} - parent directory does not exist`);
    }
  }

  listDirectories() {
    this.root.listDirectories();
  }

  #findDirectory(path, offset) {
    const directories = path.split('/');
    let currentDir = this.root;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < directories.length - offset; i++) {
      // eslint-disable-next-line no-continue
      if (directories[i] === '') continue;
      currentDir = currentDir.getChild(directories[i]);
      if (!currentDir) return undefined;
    }
    return currentDir;
  }

  #findParentDirectory(path) {
    return this.#findDirectory(path, 1);
  }

  #findChildDirectory(path) {
    return this.#findDirectory(path, 0);
  }
}

module.exports = DirectoryTree;
