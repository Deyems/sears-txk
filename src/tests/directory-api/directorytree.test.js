const assert = require('node:assert');
const { describe, it } = require('node:test');
const DirectoryTree = require('../../modules/directory-api/DirectoryTree');

describe('directory Tree', () => {
  it('should create directory successfully', () => {
    const directoryTree = new DirectoryTree();
    const path = 'fruits/apples';
    directoryTree.createDirectory(path);

    const fruitsNode = directoryTree.root.getChild('fruits');

    assert(fruitsNode, 'Fruits directory should exist');

    assert.deepStrictEqual(
      directoryTree.root.children[0],
      fruitsNode,
      'Expected fruitsNode and Directory.root.children[0] to be equal',
    );
  });

  it('should not create a directory if it already exists', () => {
    // Arrange
    const directoryTree = new DirectoryTree();
    const path = 'fruits/apples';
    directoryTree.createDirectory(path); // Create the directory first

    // Act
    directoryTree.createDirectory(path); // Try to create it again

    // Assert
    const fruitsNode = directoryTree.root.getChild('fruits');

    assert(fruitsNode, 'Fruits directory should exist');
    const applesNode = fruitsNode.children.find(
      (child) => child.name === 'apples',
    );

    assert(applesNode, 'Apples directory should still exist');

    assert.strictEqual(fruitsNode.children.length, 1);
  });

  // MOVING DIRECTORIES
  it('should move directory successfully', () => {
    const directoryTree = new DirectoryTree();
    directoryTree.createDirectory('fruits');
    directoryTree.createDirectory('vegetables');

    directoryTree.moveDirectory('fruits', 'vegetables');

    // Assert that 'fruits' directory is no longer present in root, and
    // 'fruits' is now a child of 'vegetables'
    assert.strictEqual(directoryTree.root.getChild('fruits'), undefined);

    assert.notStrictEqual(
      directoryTree.root.getChild('vegetables').getChild('fruits'),
      undefined,
    );
  });

  it('should handle moving non-existing source directory', () => {
    const directoryTree = new DirectoryTree();
    directoryTree.createDirectory('vegetables');
    directoryTree.moveDirectory('fruits', 'vegetables');

    // Assert that 'fruits' directory is not moved because it does not exist
    assert.strictEqual(
      directoryTree.root.getChild('vegetables').getChild('fruits'),
      undefined,
    );
  });

  it('should handle moving to non-existing destination directory', () => {
    const directoryTree = new DirectoryTree();
    directoryTree.createDirectory('fruits');

    directoryTree.moveDirectory('fruits', 'non-existing-directory');

    // Assert that 'fruits' directory is not moved because destination directory does not exist
    assert.strictEqual(
      directoryTree.root.getChild('non-existing-directory'),
      undefined,
    );
  });

  // DELETING DIRECTORY
  it('should delete directory successfully', () => {
    const manager = new DirectoryTree();
    manager.createDirectory('fruits');

    manager.deleteDirectory('fruits');

    // Assert that 'fruits' directory is no longer present in root
    assert.strictEqual(manager.root.getChild('fruits'), undefined);
  });

  it('should handle deleting non-existing directory', () => {
    const manager = new DirectoryTree();

    manager.deleteDirectory('fruits');

    // Assert that 'fruits' directory is not deleted because it does not exist
    assert.strictEqual(manager.root.getChild('fruits'), undefined);
  });

  it('should handle deleting directory with non-existing parent', () => {
    const manager = new DirectoryTree();
    manager.createDirectory('fruits/apples');

    manager.deleteDirectory('non-existing-directory/apples');

    // Assert that 'fruits/apples' directory is not deleted
    // because parent directory 'non-existing-directory' does not exist
    assert.notStrictEqual(
      manager.root.getChild('fruits').getChild('apples'),
      undefined,
    );
  });
});
