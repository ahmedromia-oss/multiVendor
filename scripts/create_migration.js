const { exec } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];
if (!migrationName) {
  console.error('Please provide a migration name');
  process.exit(1);
}

const command = `npx typeorm migration:generate src/migrations/${migrationName} -d src/datasource.ts`;
exec(command, (error, stdout, stderr) => {
  console.log(stderr , stdout)
  if (error) {
    console.log(error)
    console.error(`Error: ${error}`);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});