class DirectoryNode {
  constructor(name) {
    this.name = name;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(childName) {
    this.children = this.children.filter((child) => child.name !== childName);
  }

  getChild(childName) {
    const found = this.children.find((child) => child.name === childName);
    return found;
  }

  /**
   *
   * @param {*} prefix
   * @description recursive call
   */
  listDirectories(prefix = '') {
    // eslint-disable-next-line no-console
    console.log(prefix + this.name);
    this.children.forEach((child) => {
      child.listDirectories(`${prefix}  `);
    });
  }
}

module.exports = DirectoryNode;
