self.uceRequire=function(e){"use strict";var t="function"==typeof Promise?Promise:function(e){let t,s=[],n=0;return e(e=>{t=e,n=1,s.splice(0).forEach(r)}),{then:r};function r(e){return n?setTimeout(e,0,t):s.push(e),this}};const{create:s,defineProperty:n,keys:r}=Object,o=s(null),c=[],l=e=>o[e],u=(e,s)=>{const r=[],l=[],u=e.replace(/(^|[\r\n])\s*import\s*((['|"])[^\3]+?\3)/g,(e,t,s)=>t+"require("+s+")").replace(/(^|[\r\n])\s*import\s*([^\3]+?)(\s*from\s*)((['|"])[^\5]+?\5)/g,(e,t,s,n,r)=>t+"const "+s.replace(/\s+as\s+/g,":")+" = require("+r+")").replace(/^\s*export\s+default(\s*)/gm,"exports.default =$1").replace(/(^|[\r\n])\s*export\s*\{([^}]+?)\}[^\n]*/g,(e,t,s)=>(s.trim().split(/\s*,\s*/).forEach(e=>{r.push(`exports.${e} = ${e};`)}),t)).replace(/(^|[\r\n])\s*export\s+(const|let|var|function)(\s+)(\w+)/g,(e,t,s,n,o)=>(r.push(`exports.${o} = ${o};`),t+s+n+o)).concat("\n",r.join("\n")).replace(/require\s*\(\s*(['"])([^\1]+?)\1\s*\)/g,(e,t,s)=>(l.push(s),e));return s?(l.forEach(e=>{e in o||c.push(new t(t=>{let s=null;if(/^(?:[./]|https?:)/.test(e)){o[e]=s;const n=new XMLHttpRequest;n.open("get",path,!0),n.send(null),n.onload=()=>{t(o[e]=u.loader(n.responseText))}}else n(o,e,{get:()=>s,set:e=>{t(s=e)}})}))}),new t(e=>{t.all(c).then(()=>e(u))})):u},p=e=>{const t=r(e||{}),s=t.map(t=>e[t]).concat(l);return t.push("require"),e=>{const n={},o={exports:n},c=t.concat("module","exports",'"use strict;"\n'+u(e));Function.apply(null,c).apply(null,s.concat(o,n));const l=o.exports,p=r(l);return 1===p.length&&"default"===p[0]?l.default:l}};return p.loader=p(),t.all||(t.all=e=>new t(t=>{const{length:s}=e;s||t();let n=0;for(;n<s;)e[n++].then(r);function r(){++n===s&&t()}n=0})),e.asCJS=u,e.cache=o,e.cjs=p,e}({});
