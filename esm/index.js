import Promise from '@webreflection/lie';

const {create, keys} = Object;

export const cache = create(null);

const strict = '"use strict;"\n';
const $require = module => cache[module];

export const asCJS = (esm, require) => {
  const exports = [];
  const imports = [];
  const cjs = esm
    .replace(
      /(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g,
      (_, $1, $2) => $1 + 'require(' + $2 + ')'
    )
    .replace(
      /(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g,
      (_, $1, $2, $, $3) => (
        $1 + 'const ' + $2.replace(/\s+as\s+/g, ':') + ' = require(' + $3 + ')'
      )
    )
    .replace(
      /^\s*export\s+default(\s*)/mg,
      'exports.default =$1'
    )
    .replace(
      /(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g,
      (_, $, $1) => {
        $1.trim().split(/\s*,\s*/).forEach(name => {
          exports.push(`exports.${name} = ${name};`);
        });
        return $;
      }
    )
    .replace(
      /(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g,
      (_, $, $1, $2, $3) => {
        exports.push(`exports.${$3} = ${$3};`);
        return $ + $1 + $2 + $3;
      }
    )
    .concat('\n', exports.join('\n'))
    .replace(/require\s*\((['"])([^\1]+?)\1\s*\)/g, ($, _, module) => {
      imports.push(module);
      return $;
    })
  ;
  if (require) {
    imports.forEach(key => {
      if (!(key in cache)) {
        cache[key] = void 0;
        all.push(load(key, key));
      }
    });
    return new Promise($ => {
      Promise.all(all).then(() => $(cjs));
    });
  }
  return cjs;
};

export const cjs = extras => {
  const args = keys(extras || {});
  const values = args.map(k => extras[k]).concat($require);
  args.push('require');
  return code => {
    const exports = {};
    const module = {exports};
    const params = args.concat('module', 'exports', strict + asCJS(code));
    const fn = Function.apply(null, params);
    fn.apply(null, values.concat(module, exports));
    const result = module.exports;
    const k = keys(result);
    return k.length === 1 && k[0] === 'default' ? result.default : result;
  };
};

cjs.loader = cjs();

if (!Promise.all)
  Promise.all = list => new Promise($ => {
    const {length} = list;
    if (!length)
      $();
    let i = 0;
    while (i < length)
      list[i++].then(update);
    i = 0;
    function update() {
      if (++i === length) $();
    }
  });

const all = [];
const load = (module, path) => new Promise($ => {
  const xhr = new XMLHttpRequest;
  xhr.open('get', path, true);
  xhr.send(null);
  xhr.onload = () => {
    $(cache[module] = cjs.loader(xhr.responseText));
  };
});
