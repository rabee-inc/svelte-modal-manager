import path from 'path';
import fs from 'fs';

const PACKAGE_NAME = '@rabee-org/svelte-modal-manager';
const TYPE_DIR_NAME = '_svelte-modal-manager-types';

const rmdirSync = (path = '') => {
  fs.rmSync(path, { recursive: true, force: true });
};

const mkdirSync = (path = '') => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

/**
 * 再帰的にファイル読み込み
 * @param {string} dir 
 * @param {{ extensions?: string[] }} param2
 * @returns 
 */
const readDirRecursive = (dir, { extensions = [] } = {}) => {
  /**
   * 
   * @param {string} dir 
   * @param {string[]} files 
   * @returns 
   */
  const _readDirRecursive = (dir, files = []) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const dirs = [];
    for (const entry of entries) {
      if (entry.isDirectory()) dirs.push(`${dir}/${entry.name}`);
      if (entry.isFile()) {
        const ext = entry.name.replace(/^.*\.(.+)$/, '$1');
        if (extensions.length === 0 || extensions.includes(ext)) {
          files.push(`${dir}/${entry.name}`);
        }
      }
    }
    for (const d of dirs) {
      files = _readDirRecursive(d, files);
    }
    return files;
  };

  return _readDirRecursive(dir, []);
};

/**
 * 
 * @param {(...args: any) => any} func 
 * @param {number} ms 
 * @returns {((...args: any) => any) & { cancel: () => void }}
 */
const debounce = (func, ms) => {
  /** @type {NodeJS.Timeout} */
  let id;
  return Object.assign((/** @type {any[]} */ ...args) => {
    clearTimeout(id);
    id = setTimeout(() => func(...args), ms);
  }, {
    cancel: () => clearTimeout(id),
  });
};

const toCamelCase = (str = '') => {
  return str.replace(/-([a-zA-Z])/g, (g) => g[1].toUpperCase()).replace(/-(\d)/g, '$1');
};

const getTypeDeclare = ({ moduleName = '', componentPath = '', componentName = '' } = {}) => `declare module '${moduleName}' {
  import type { ModalControllerProxy } from "${PACKAGE_NAME}/types";
  import type * as ${toCamelCase(componentName)} from "${componentPath}";
  export const ${toCamelCase('modal-' + componentName)}: ModalControllerProxy<typeof ${toCamelCase(componentName)}, any>;
}
`;

/**
 * modal の関数定義などの自動生成をする vite plugin を返します。
 * @returns {import('vite').PluginOption}
 */
export function modalManagerPlugin({ moduleName = '$modal', componentAlias = '$modals' } = {}) {
  /** @type {Set<string>} */
  let fileSet = new Set();
  const resolvedVirtualModuleName = '\0' + moduleName;
  let componentDir = '';
  let typesDir = '';
  
  const isModalComponent = (id = '') => {
    return path.resolve(id).startsWith(componentDir) && id.endsWith('.svelte');
  };
  
  const getComponentName = (id = '') => {
    const resolvedPath = path.resolve(id);
    const replacedPath = resolvedPath.replace(componentDir, '').replace(/^\//, '').replace(/\/|\s/g, '-');
    return path.basename(replacedPath, '.svelte');
  };

  const getComponentPath = (id = '') => {
    return path.resolve(id).replace(componentDir, componentAlias);
  };

  const getTypePath = (id = '') => {
    const resolvedPath = path.resolve(id);
    const replacedPath = resolvedPath.replace(componentDir, '').replace(/\.svelte$/, '').replace(/^\//g, '');
    return path.resolve(typesDir, replacedPath + '.d.ts');
  };

  // 型定義ファイルの書き込み
  const writeTypeDefinition = (id = '') => {
    const resolvedPath = path.resolve(id);
    const typePath = getTypePath(id);
    mkdirSync(path.dirname(typePath));
    fileSet.add(resolvedPath);
    fs.writeFileSync(typePath, getTypeDeclare({
      moduleName,
      componentPath: getComponentPath(id),
      componentName: getComponentName(id),
    }));
  };

  let virtualModule = '';
  const buildVirtualModule = () => {
    let lines = [`import { createModalController } from '${PACKAGE_NAME}';`];
    let count = 0;
    fileSet.forEach((id) => {
      const resolvedPath = path.resolve(id);
      if (!fs.existsSync(resolvedPath)) return;

      const componentPath = getComponentPath(id);
      const componentName = toCamelCase(getComponentName(id));
      lines.push(
        `import * as ${componentName}_${count} from '${componentPath}';`,
        `export const ${toCamelCase('modal-' + componentName)} = createModalController(${componentName}_${count});`
      );
      count++;
    });
    virtualModule = lines.join('\n');
  };

  const getVirtualModule = () => {
    if (!virtualModule) {
      buildVirtualModule();
    }
    return virtualModule;
  };


  // 削除されたコンポーネントがあるかチェックして、あれば型定義ファイルを削除し、virtual module を再構築する
  const cleanUp = () => {
    let isUpdated = false;
    fileSet.forEach((id) => {
      if (!fs.existsSync(id)) {
        fileSet.delete(id);
        const typePath = getTypePath(id);
        if (fs.existsSync(typePath)) {
          fs.rmSync(typePath);
        }
        isUpdated = true;
      }
    });

    const files = readDirRecursive(componentDir, { extensions: ['svelte'] });
    files.forEach((file) => {
      if (!fileSet.has(file)) {
        isUpdated = true;
        writeTypeDefinition(file);
      }
    });
    fileSet = new Set(files);
    if (isUpdated) {
      buildVirtualModule();
    }
  };

  const debouncedCleanUp = debounce(cleanUp, 100);

  return {
    name: '@rabee-org/svelte-modal-manager-plugin',
    configResolved(config) {
      const alias = (config.resolve?.alias || []).find(alias => alias.find === componentAlias);
      if (!alias) { 
        throw new Error(`alias ${componentAlias} is not found.\nsvelte.config.js must have alias like this:\nalias: {\n  '${componentAlias}': path.resolve('./src/components/modals'),\n}`);
      }
      componentDir = path.resolve(alias.replacement);
      typesDir = path.resolve(componentDir, TYPE_DIR_NAME);
    },
    buildStart() {
      rmdirSync(typesDir);
      mkdirSync(typesDir);

      const files = readDirRecursive(componentDir, { extensions: ['svelte'] });
      fileSet = new Set(files);
      files.forEach(writeTypeDefinition);
    },
    resolveId(id) {
      if (id === moduleName) {
        return resolvedVirtualModuleName;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleName) {
        return getVirtualModule();
      }
    },
    handleHotUpdate(ctx) {
      const id = path.resolve(ctx.file);
      if (isModalComponent(id)) {
        // 新しいファイルが追加されたら、virtual module を再生成する
        if (!fileSet.has(id)) {
          fileSet.add(id);
          buildVirtualModule();
        }
        writeTypeDefinition(ctx.file);
      }
      debouncedCleanUp();
    },

    buildEnd() { 
      debouncedCleanUp.cancel();
      cleanUp();
    }
  }
}
