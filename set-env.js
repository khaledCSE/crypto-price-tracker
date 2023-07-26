const fs = require('fs');
const yargs = require('yargs');

require('dotenv').config();

const argv = yargs.argv;
const environment = argv.environment;
const isProd = environment === 'prod';

const targetPath = isProd
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.ts`;

const envConfigFile = `
export const environment = {
  production: ${isProd},
  apiKey: "${process.env.API_Key}"
};
`;

// Create directory if it does not exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.error(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
