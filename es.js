self.uceRequire=function(e){"use strict";var t="function"==typeof Promise?Promise:function(e){let t,s=[],n=0;return e(e=>{t=e,n=1,s.splice(0).forEach(r)}),{then:r};function r(e){return n?setTimeout(e,0,t):s.push(e),this}};const{create:s,keys:n}=Object,r=s(null),o=e=>r[e],c=(e,s)=>{const n=[],o=[],c=e.replace(/(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g,(e,t,s)=>t+"require("+s+")").replace(/(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g,(e,t,s,n,r)=>t+"const "+s.replace(/\s+as\s+/g,":")+" = require("+r+")").replace(/^\s*export\s+default(\s*)/gm,"exports.default =$1").replace(/(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g,(e,t,s)=>(s.trim().split(/\s*,\s*/).forEach(e=>{n.push(`exports.${e} = ${e};`)}),t)).replace(/(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g,(e,t,s,r,o)=>(n.push(`exports.${o} = ${o};`),t+s+r+o)).concat("\n",n.join("\n")).replace(/require\s*\((['"])([^\1]+?)\1\s*\)/g,(e,t,s)=>(o.push(s),e));return s?(o.forEach(e=>{!(e in r)&&/^(?:[./]|https?:)/.test(e)&&(r[e]=void 0,u.push(p(e,e)))}),new t(e=>{t.all(u).then(()=>e(c))})):c},l=e=>{const t=n(e||{}),s=t.map(t=>e[t]).concat(o);return t.push("require"),e=>{const r={},o={exports:r},l=t.concat("module","exports",'"use strict;"\n'+c(e));Function.apply(null,l).apply(null,s.concat(o,r));const u=o.exports,p=n(u);return 1===p.length&&"default"===p[0]?u.default:u}};l.loader=l(),t.all||(t.all=e=>new t(t=>{const{length:s}=e;s||t();let n=0;for(;n<s;)e[n++].then(r);function r(){++n===s&&t()}n=0}));const u=[],p=(e,s)=>new t(t=>{const n=new XMLHttpRequest;n.open("get",s,!0),n.send(null),n.onload=()=>{t(r[e]=l.loader(n.responseText))}});return e.asCJS=c,e.cache=r,e.cjs=l,e}({});
