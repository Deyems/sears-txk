const { execSync } = require('child_process');

const path = require('path');

const currentDir = path.resolve(process.cwd(), 'src', 'tests', 'directory-api');

// Array of test files to run
const testFiles = [
  `${currentDir}/directorytree.test.js`,
  `${currentDir}/directorynode.test.js`,
];

// Run each test file sequentially
testFiles.forEach((testFile) => {
  // eslint-disable-next-line no-console
  console.log(`Running tests in ${testFile}...`);
  try {
    execSync(`node ${testFile}`, { stdio: 'inherit' });
  } catch (error) {
    process.exit(1); // Exit with non-zero code if any test fails
  }
});
