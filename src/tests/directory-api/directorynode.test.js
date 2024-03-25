const assert = require('node:assert');
const {
  describe, it, beforeEach, afterEach,
} = require('node:test');
const DirectoryNode = require('../../modules/directory-api/DirectoryNode');

// eslint-disable-next-line no-console
const originalConsoleLog = console.log;

describe('directory Node APIs', () => {
  let parentNode;
  let childNode;
  let loggedOutput;

  beforeEach(() => {
    // Instantiate parent and child directory nodes before each test case
    parentNode = new DirectoryNode('parent');
    childNode = new DirectoryNode('child');

    // Reset loggedOutput before each test case
    loggedOutput = '';
    // Mock console.log to capture its output
    // eslint-disable-next-line no-console, func-names
    console.log = function (...args) {
      loggedOutput += args.join(' '); // Concatenate logged output
    };
  });

  afterEach(() => {
    // Restore original console.log after each test case
    // eslint-disable-next-line no-console
    console.log = originalConsoleLog;
  });

  it('should add child to a directory successfully', () => {
    // Call the addChild method to add the child node to the parent node
    parentNode.addChild(childNode);

    // Assert that the child node is added to the parent node's children array
    assert.strictEqual(parentNode.children.length, 1);
    assert.strictEqual(parentNode.children[0], childNode);
  });

  it('should remove child successfully', () => {
    // Create child directory nodes
    const childNode1 = new DirectoryNode('child1');
    const childNode2 = new DirectoryNode('child2');
    const childNode3 = new DirectoryNode('child3');

    // Add child nodes to the parent node
    parentNode.addChild(childNode1);
    parentNode.addChild(childNode2);
    parentNode.addChild(childNode3);

    // Call the removeChild method to remove a child node
    parentNode.removeChild('child2');

    // Assert that the child node 'child2' is removed from the parent node's children array
    assert.strictEqual(parentNode.children.length, 2);
    assert.strictEqual(parentNode.children[0], childNode1);
    assert.strictEqual(parentNode.children[1], childNode3);
  });

  it('should retrieve child successfully', () => {
    // Create child directory nodes
    const childNode1 = new DirectoryNode('child1');
    const childNode2 = new DirectoryNode('child2');
    const childNode3 = new DirectoryNode('child3');

    // Add child nodes to the parent node
    parentNode.addChild(childNode1);
    parentNode.addChild(childNode2);
    parentNode.addChild(childNode3);

    // Call the getChild method to retrieve a child node
    const foundChild = parentNode.getChild('child2');

    // Assert that the retrieved child node is 'child2'
    assert.strictEqual(foundChild, childNode2);
  });

  it('should list directories successfully', () => {
    // Create child directory nodes
    const childNode1 = new DirectoryNode('child1');
    const childNode2 = new DirectoryNode('child2');
    const childNode3 = new DirectoryNode('child3');

    // Add child nodes to the parent node
    parentNode.addChild(childNode1);
    parentNode.addChild(childNode2);
    parentNode.addChild(childNode3);

    // Call the listDirectories method
    parentNode.listDirectories();

    // Verify the logged output
    assert.strictEqual(loggedOutput, 'parent  child1  child2  child3');
  });
});
