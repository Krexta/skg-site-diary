import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const config_str = readFileSync('.devcontainer.json', 'utf8');
const config_str_without_comment = config_str
  .split('\n')
  .filter((line) => !line.match(/^\s*\/\/ /))
  .join('\n');

const config = JSON.parse(config_str_without_comment);

const extension_list = config.customizations.vscode.extensions;

for (const ext of extension_list) {
  console.log(execSync(`code --install-extension ${ext}`).toString());
}
