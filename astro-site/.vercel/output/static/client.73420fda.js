import{i as N,b as p,d as M,e as x,f as O,g as I,h as B,j as T,k as w,l as z,m as q,n as D,p as _,q as W,r as $,s as u}from"./chunks/runtime-core.esm-bundler.7d7316c5.js";const j="http://www.w3.org/2000/svg",a=typeof document<"u"?document:null,g=a&&a.createElement("template"),F={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const r=t?a.createElementNS(j,e):a.createElement(e,n?{is:n}:void 0);return e==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:e=>a.createTextNode(e),createComment:e=>a.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>a.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},cloneNode(e){const t=e.cloneNode(!0);return"_value"in e&&(t._value=e._value),t},insertStaticContent(e,t,n,i,r,s){const c=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===s||!(r=r.nextSibling)););else{g.innerHTML=i?`<svg>${e}</svg>`:e;const o=g.content;if(i){const f=o.firstChild;for(;f.firstChild;)o.appendChild(f.firstChild);o.removeChild(f)}t.insertBefore(o,n)}return[c?c.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};function U(e,t,n){const i=e._vtc;i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}function X(e,t,n){const i=e.style,r=p(n);if(n&&!r){for(const s in n)m(i,s,n[s]);if(t&&!p(t))for(const s in t)n[s]==null&&m(i,s,"")}else{const s=i.display;r?t!==n&&(i.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(i.display=s)}}const S=/\s*!important$/;function m(e,t,n){if(T(n))n.forEach(i=>m(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=G(e,t);S.test(n)?e.setProperty(w(i),n.replace(S,""),"important"):e[i]=n}}const b=["Webkit","Moz","ms"],d={};function G(e,t){const n=d[t];if(n)return n;let i=z(t);if(i!=="filter"&&i in e)return d[t]=i;i=q(i);for(let r=0;r<b.length;r++){const s=b[r]+i;if(s in e)return d[t]=s}return t}const A="http://www.w3.org/1999/xlink";function J(e,t,n,i,r){if(i&&t.startsWith("xlink:"))n==null?e.removeAttributeNS(A,t.slice(6,t.length)):e.setAttributeNS(A,t,n);else{const s=D(t);n==null||s&&!_(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}function K(e,t,n,i,r,s,c){if(t==="innerHTML"||t==="textContent"){i&&c(i,r,s),e[t]=n??"";return}if(t==="value"&&e.tagName!=="PROGRESS"&&!e.tagName.includes("-")){e._value=n;const f=n??"";(e.value!==f||e.tagName==="OPTION")&&(e.value=f),n==null&&e.removeAttribute(t);return}let o=!1;if(n===""||n==null){const f=typeof e[t];f==="boolean"?n=_(n):n==null&&f==="string"?(n="",o=!0):f==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(t)}const[P,Q]=(()=>{let e=Date.now,t=!1;if(typeof window<"u"){Date.now()>document.createEvent("Event").timeStamp&&(e=performance.now.bind(performance));const n=navigator.userAgent.match(/firefox\/(\d+)/i);t=!!(n&&Number(n[1])<=53)}return[e,t]})();let h=0;const Y=Promise.resolve(),Z=()=>{h=0},V=()=>h||(Y.then(Z),h=P());function y(e,t,n,i){e.addEventListener(t,n,i)}function k(e,t,n,i){e.removeEventListener(t,n,i)}function tt(e,t,n,i,r=null){const s=e._vei||(e._vei={}),c=s[t];if(i&&c)c.value=i;else{const[o,f]=et(t);if(i){const R=s[t]=nt(i,r);y(e,o,R,f)}else c&&(k(e,o,c,f),s[t]=void 0)}}const E=/(?:Once|Passive|Capture)$/;function et(e){let t;if(E.test(e)){t={};let i;for(;i=e.match(E);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):w(e.slice(2)),t]}function nt(e,t){const n=i=>{const r=i.timeStamp||P();(Q||r>=n.attached-1)&&W(it(i,n.value),t,5,[i])};return n.value=e,n.attached=V(),n}function it(e,t){if(T(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>r=>!r._stopped&&i&&i(r))}else return t}const C=/^on[a-z]/,rt=(e,t,n,i,r=!1,s,c,o,f)=>{t==="class"?U(e,i,r):t==="style"?X(e,n,i):I(t)?B(t)||tt(e,t,n,i,c):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):st(e,t,i,r))?K(e,t,i,s,c,o,f):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),J(e,t,i,r))};function st(e,t,n,i){return i?!!(t==="innerHTML"||t==="textContent"||t in e&&C.test(t)&&N(n)):t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA"||C.test(t)&&p(n)?!1:t in e}const H=O({patchProp:rt},F);let l,v=!1;function ot(){return l||(l=M(H))}function ct(){return l=v?l:x(H),v=!0,l}const ft=(...e)=>{const t=ot().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=L(i);if(!r)return;const s=t._component;!N(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.innerHTML="";const c=n(r,!1,r instanceof SVGElement);return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),c},t},at=(...e)=>{const t=ct().createApp(...e),{mount:n}=t;return t.mount=i=>{const r=L(i);if(r)return n(r,!0,r instanceof SVGElement)},t};function L(e){return p(e)?document.querySelector(e):e}const lt=$({props:{value:String,name:String},setup({name:e,value:t}){return t?()=>u("astro-slot",{name:e,innerHTML:t}):()=>null}}),pt=e=>(t,n,i,{client:r})=>{if(delete n.class,!e.hasAttribute("ssr"))return;const s=t.name?`${t.name} Host`:void 0,c={};for(const[o,f]of Object.entries(i))c[o]=()=>u(lt,{value:f,name:o==="default"?void 0:o});r==="only"?ft({name:s,render:()=>u(t,n,c)}).mount(e,!1):at({name:s,render:()=>u(t,n,c)}).mount(e,!0)};export{pt as default};
