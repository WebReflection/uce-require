self.uceRequire=function(n){"use strict";var t="function"==typeof Promise?Promise:function(n){var t,e=[],r=0;return n((function(n){t=n,r=1,e.splice(0).forEach(u)})),{then:u};function u(n){return r?setTimeout(n,0,t):e.push(n),this}},e=Object.create,r=Object.defineProperty,u=Object.keys,c=e(null),o={},s=[],i=function(n){return c[n]},a=function(n,e){var u=[],i=[],a=n.replace(/(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g,(function(n,t,e){return t+"require("+e+")"})).replace(/(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g,(function(n,t,e,r,u){return t+"const "+e.replace(/\s+as\s+/g,":")+" = require("+u+")"})).replace(/^\s*export\s+default(\s*)/gm,"exports.default =$1").replace(/(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g,(function(n,t,e){return e.trim().split(/\s*,\s*/).forEach((function(n){u.push("exports.".concat(n," = ").concat(n,";"))})),t})).replace(/(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g,(function(n,t,e,r,c){return u.push("exports.".concat(c," = ").concat(c,";")),t+e+r+c})).concat("\n",u.join("\n")).replace(/require\s*\(\s*(['"])([^\1]+?)\1\s*\)/g,(function(n,t,e){return i.push(e),n}));return e?(i.forEach((function(n){n in c||s.push(new t((function(t){var e=o;if(/^(?:[./]|https?:)/.test(n)){c[n]=e;var u=new XMLHttpRequest;u.open("get",n,!0),u.send(null),u.onload=function(){t(c[n]=a.loader(u.responseText))}}else r(c,n,{get:function(){return e},set:function(n){t(e=n)}})})))})),new t((function(n){t.all(s).then((function(){return n(a)}))}))):a},f=function(n){var t=u(n||{}),e=t.map((function(t){return n[t]})).concat(i);return t.push("require"),function(n){var r={},c={exports:r},o=t.concat("module","exports",'"use strict;"\n'+a(n));Function.apply(null,o).apply(null,e.concat(c,r));var s=c.exports,i=u(s);return 1===i.length&&"default"===i[0]?s.default:s}};return f.loader=f(),t.all||(t.all=function(n){return new t((function(t){var e=n.length;e||t();for(var r=0;r<e;)n[r++].then(u);function u(){++r===e&&t()}r=0}))}),n.asCJS=a,n.cache=c,n.cjs=f,n.waiting=o,n}({});