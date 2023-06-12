#!/usr/bin/env node

import { create } from './index.js';

const [, , cmd, ...args] = process.argv;
const commandArgs = [];
const options = {};
args.reduce((o, v) => {
  if (v.startsWith('-')) {
    o.optionName = '';
    let name = v.replace(/^-+/g, '');
    if (name.includes('=')) {
      const splitted = name.split('=');
      name = splitted.shift();
      options[name] = splitted.join('=');
    }
    else {
      options[name] = '';
      o.optionName = name;
    }
    return o;
  }
  else {
    if (o.optionName) {
      options[o.optionName] = v;
      o.optionName = '';
    } else {
      commandArgs.push(v);
    }
    return o;
  }
}, { optionName: '' });

const commands = {
  create,
};
(async () => {
  try {
    if (!commands[cmd]) throw new Error(`command: ${cmd} not found.\ncommands: ${Object.keys(commands).join(', ')}`);
    
    commands[cmd](commandArgs, options);
  }
  catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
