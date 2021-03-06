'use strict';
const Promise = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/lie'));
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

const {create, defineProperty, keys} = Object;

const lazyModules = [];
const strict = '"use strict;"\n';
const $require = module => cache[module];

const cache = create(null);
exports.cache = cache;

const waiting = {};
exports.waiting = waiting;

const asCJS = (esm, require) => {
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
    .replace(/require\s*\(\s*(['"])([^\1]+?)\1\s*\)/g, ($, _, module) => {
      imports.push(module);
      return $;
    })
  ;
  if (require) {
    imports.forEach(key => {
      if (!(key in cache)) {
        lazyModules.push(new Promise($ => {
          let module = waiting;
          if (/^(?:[./]|https?:)/.test(key)) {
            cache[key] = module;
            const xhr = new XMLHttpRequest;
            xhr.open('get', key, true);
            xhr.send(null);
            xhr.onload = () => {
              $(cache[key] = loader(xhr.responseText));
            };
          }
          else {
            defineProperty(cache, key, {
              get: () => module,
              set: value => {
                $(module = value);
              }
            });
          }
        }));
      }
    });
    return new Promise($ => {
      Promise.all(lazyModules).then(() => $(cjs));
    });
  }
  return cjs;
};
exports.asCJS = asCJS;

const cjs = extras => {
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
exports.cjs = cjs;

const loader = cjs();
exports.loader = loader;
