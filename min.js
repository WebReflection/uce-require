self.uceRequire=function(n){"use strict";var t="function"==typeof Promise?Promise:function(n){var t,e=[],r=0;return n((function(n){t=n,r=1,e.splice(0).forEach(u)})),{then:u};function u(n){return r?setTimeout(n,0,t):e.push(n),this}},e=Object.create,r=Object.keys,u=e(null),o=function(n){return u[n]},c=function(n,e){var r=[],o=[],c=n.replace(/(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g,(function(n,t,e){return t+"require("+e+")"})).replace(/(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g,(function(n,t,e,r,u){return t+"const "+e.replace(/\s+as\s+/g,":")+" = require("+u+")"})).replace(/^\s*export\s+default(\s*)/gm,"exports.default =$1").replace(/(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g,(function(n,t,e){return e.trim().split(/\s*,\s*/).forEach((function(n){r.push("exports.".concat(n," = ").concat(n,";"))})),t})).replace(/(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g,(function(n,t,e,u,o){return r.push("exports.".concat(o," = ").concat(o,";")),t+e+u+o})).concat("\n",r.join("\n")).replace(/require\s*\((['"])([^\1]+?)\1\s*\)/g,(function(n,t,e){return o.push(e),n}));return e?(o.forEach((function(n){!(n in u)&&/^(?:[./]|https?:)/.test(n)&&(u[n]=void 0,a.push(i(n,n)))})),new t((function(n){t.all(a).then((function(){return n(c)}))}))):c},s=function(n){var t=r(n||{}),e=t.map((function(t){return n[t]})).concat(o);return t.push("require"),function(n){var u={},o={exports:u},s=t.concat("module","exports",'"use strict;"\n'+c(n));Function.apply(null,s).apply(null,e.concat(o,u));var a=o.exports,i=r(a);return 1===i.length&&"default"===i[0]?a.default:a}};s.loader=s(),t.all||(t.all=function(n){return new t((function(t){var e=n.length;e||t();for(var r=0;r<e;)n[r++].then(u);function u(){++r===e&&t()}r=0}))});var a=[],i=function(n,e){return new t((function(t){var r=new XMLHttpRequest;r.open("get",e,!0),r.send(null),r.onload=function(){t(u[n]=s.loader(r.responseText))}}))};return n.asCJS=c,n.cache=u,n.cjs=s,n}({});