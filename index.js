self.uceRequire = (function (exports) {
  'use strict';

  var Promise$1 = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0,
        value;
    fn(function ($) {
      value = $;
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn, 0, value) : queue.push(fn), this;
    }
  };

  if (!Promise$1.all) Promise$1.all = function (list) {
    return new Promise$1(function ($) {
      var length = list.length;
      if (!length) $();
      var i = 0;

      while (i < length) {
        list[i++].then(update);
      }

      i = 0;

      function update() {
        if (++i === length) $();
      }
    });
  };
  var create = Object.create,
      defineProperty = Object.defineProperty,
      keys = Object.keys;
  var lazyModules = [];
  var strict = '"use strict;"\n';

  var $require = function $require(module) {
    return cache[module];
  };

  var cache = create(null);
  var waiting = {};
  var asCJS = function asCJS(esm, require) {
    var exports = [];
    var imports = [];
    var cjs = esm.replace(/(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g, function (_, $1, $2) {
      return $1 + 'require(' + $2 + ')';
    }).replace(/(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g, function (_, $1, $2, $, $3) {
      return $1 + 'const ' + $2.replace(/\s+as\s+/g, ':') + ' = require(' + $3 + ')';
    }).replace(/^\s*export\s+default(\s*)/mg, 'exports.default =$1').replace(/(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g, function (_, $, $1) {
      $1.trim().split(/\s*,\s*/).forEach(function (name) {
        exports.push("exports.".concat(name, " = ").concat(name, ";"));
      });
      return $;
    }).replace(/(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g, function (_, $, $1, $2, $3) {
      exports.push("exports.".concat($3, " = ").concat($3, ";"));
      return $ + $1 + $2 + $3;
    }).concat('\n', exports.join('\n')).replace(/require\s*\(\s*(['"])([^\1]+?)\1\s*\)/g, function ($, _, module) {
      imports.push(module);
      return $;
    });

    if (require) {
      imports.forEach(function (key) {
        if (!(key in cache)) {
          lazyModules.push(new Promise$1(function ($) {
            var module = waiting;

            if (/^(?:[./]|https?:)/.test(key)) {
              cache[key] = module;
              var xhr = new XMLHttpRequest();
              xhr.open('get', key, true);
              xhr.send(null);

              xhr.onload = function () {
                $(cache[key] = loader(xhr.responseText));
              };
            } else {
              defineProperty(cache, key, {
                get: function get() {
                  return module;
                },
                set: function set(value) {
                  $(module = value);
                }
              });
            }
          }));
        }
      });
      return new Promise$1(function ($) {
        Promise$1.all(lazyModules).then(function () {
          return $(cjs);
        });
      });
    }

    return cjs;
  };
  var cjs = function cjs(extras) {
    var args = keys(extras || {});
    var values = args.map(function (k) {
      return extras[k];
    }).concat($require);
    args.push('require');
    return function (code) {
      var exports = {};
      var module = {
        exports: exports
      };
      var params = args.concat('module', 'exports', strict + asCJS(code));
      var fn = Function.apply(null, params);
      fn.apply(null, values.concat(module, exports));
      var result = module.exports;
      var k = keys(result);
      return k.length === 1 && k[0] === 'default' ? result["default"] : result;
    };
  };
  var loader = cjs();

  exports.asCJS = asCJS;
  exports.cache = cache;
  exports.cjs = cjs;
  exports.loader = loader;
  exports.waiting = waiting;

  return exports;

}({}));
