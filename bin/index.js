import path from 'path';
import fs from 'fs';
import { getTemplate } from "./constants.js";

export const create = (args, options = {}) => {
  const example = `example: svelte-modal-manager create Menu -t pug -d ./src/components/modals" -s less`;
  const name = args[0];
  if (!name) {
    throw new Error('first argument is required.\n' + example);
  }

  let template = (options.template || options.t || 'html').toLowerCase();
  if (!/html|pug/.test(template)) {
    throw new Error(`invalid template: ${template}. template must be html or pug.\n${example}`);
  }

  let dir = options.dir || options.d || './src/components/modals';
  dir = path.resolve(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let style = (options.style || options.s || 'css').toLowerCase();

  const filePath = path.resolve(dir, name + '.svelte');
  if (fs.existsSync(filePath)) { 
    throw new Error(`file already exists: ${filePath}`);
  }

  fs.writeFileSync(filePath, getTemplate({
    style,
    template,
  }));

  console.log(`created: ${filePath}`);
};