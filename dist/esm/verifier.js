import{TokenError as e}from"./error.js";import{createDecoder as o}from"./decoder.js";import{createSecretKey as t,createPublicKey as r}from"crypto";import{d as i,h as n,l as a,u as c,v as s}from"./crypto-56fbb56b.js";import"ecdsa-sig-formatter";import{ensurePromiseCallback as l,hashToken as f,getAsyncKey as m}from"./utils.js";function u(o,t){const r=o[0].slice(0,2),i=t[0].slice(0,2);let n=!0;if("RS"===r||"PS"===r?n="RS"===i:"ES"!==r&&"Ed"!==r||(n=r===i),!n)throw new e(e.codes.invalidKey,`Invalid public key provided for algorithms ${o.join(", ")}.`)}function d(e,o){return"string"==typeof e&&(e=Buffer.from(e,"utf-8")),c&&(e=o?t(e):r(e)),e}function p(e){return Array.isArray(e)||(e=[e]),e.map(e=>e&&"function"==typeof e.test?e:new RegExp(e.toString()))}function h(e){const o=parseInt(!0===e?1e3:e,10);return o>0?new a(o):null}function g({cache:e,token:o,cacheTTL:t,payload:r,ignoreExpiration:i,ignoreNotBefore:n,maxAge:a,clockTimestamp:c,clockTolerance:s},l){if(!e)return l;const m=[l,0,0];r&&"number"==typeof r.iat&&(m[1]=n||"number"!=typeof r.nbf?0:1e3*r.nbf,i||("number"==typeof r.exp?m[2]=1e3*r.exp:a&&(m[2]=1e3*r.iat+a)));const u=(c||Date.now())+s+t;return m[2]=0===m[2]?u:Math.min(m[2],u),e.set(f(o),m),l}function y(o,t,r,i){const n=r?`The ${t} claim must be a ${i} or an array of ${i}s.`:`The ${t} claim must be a ${i}.`;if(o.map(e=>typeof e).some(e=>e!==i))throw new e(e.codes.invalidClaimType,n)}function w(o,t,r,i){const n=i?`None of ${t} claim values is allowed.`:`The ${t} claim value is not allowed.`;if(!o.some(e=>r.some(o=>o.test(e))))throw new e(e.codes.invalidClaimValue,n)}function T(o,t,r,i,n,a){const c=1e3*o+(t||0);if(!(i?r>=c:r<=c))throw new e(e.codes[n],`The token ${a} at ${new Date(c).toISOString()}.`)}function b(o,{input:t,header:r,payload:i,signature:n},{validators:a,allowedAlgorithms:c,clockTimestamp:l,clockTolerance:f}){const m=o instanceof Buffer?o.length:!!o;if(m&&!n)throw new e(e.codes.missingSignature,"The token signature is missing.");if(!m&&n)throw new e(e.codes.missingKey,"The key option is missing.");!function(o,t,r,i,n){if(!n.includes(t.alg))throw new e(e.codes.invalidAlgorithm,"The token algorithm is invalid.");if(r&&!s(t.alg,i,o,r))throw new e(e.codes.invalidSignature,"The token signature is invalid.")}(t,r,n,o,c);const u=(l||Date.now())+f;for(const e of a){const{type:o,claim:t,allowed:r,array:n,modifier:a,greater:c,errorCode:s,errorVerb:l}=e,f=i[t],m=Array.isArray(f),d=m?f:[f];t in i&&(y(d,t,n,"date"===o?"number":"string"),"date"===o?T(f,a,u,c,s,l):w(d,t,r,m))}}function k({key:o,allowedAlgorithms:t,complete:r,cacheTTL:a,clockTimestamp:c,clockTolerance:s,ignoreExpiration:p,ignoreNotBefore:h,maxAge:y,isAsync:w,validators:T,decode:k,cache:v},A,x){const[E,S]=w?l(x):[],$={cache:v,token:A,cacheTTL:a,payload:void 0,ignoreExpiration:p,ignoreNotBefore:h,maxAge:y,clockTimestamp:c,clockTolerance:s};if(v){const[o,t,r]=v.get(f(A))||[void 0,0,0],i=(c||Date.now())+s;if(void 0!==o&&(0===t||i>t)&&(0===r||i<=r))return function(o,t,r){if(o instanceof e){if(!t)throw o;t(o)}else{if(!t)return o;t(null,o)}return r}(o,E,S)}let B;try{B=k(A)}catch(e){if(E)return E(e),S;throw e}const{header:N,payload:L,signature:j}=B;$.payload=L;const C={validators:T,allowedAlgorithms:t,clockTimestamp:c,clockTolerance:s};if(!E)try{return b(o,B,C),g($,r?{header:N,payload:L,signature:j}:L)}catch(e){throw g($,e)}return m(o,N,(o,a)=>{if(o)return E(g($,e.wrap(o,e.codes.keyFetchingError,"Cannot fetch key.")));if("string"==typeof a)a=Buffer.from(a,"utf-8");else if(!(a instanceof Buffer))return E(g($,new e(e.codes.keyFetchingError,"The key returned from the callback must be a string or a buffer containing a secret or a public key.")));try{const e=i(a);C.allowedAlgorithms.length?u(t,e):C.allowedAlgorithms=e,b(a=d(a,e[0]===n[0]),B,C)}catch(e){return E(g($,e))}E(null,g($,r?{header:N,payload:L,signature:j}:L))}),S}function v(t){let{key:r,algorithms:a,complete:c,cache:s,cacheTTL:l,clockTimestamp:f,clockTolerance:m,ignoreExpiration:g,ignoreNotBefore:y,maxAge:w,allowedJti:T,allowedAud:b,allowedIss:v,allowedSub:A,allowedNonce:x}={cacheTTL:6e5,...t};Array.isArray(a)||(a=[]);const E=typeof r;if("string"!==E&&"object"!==E&&"function"!==E)throw new e(e.codes.INVALID_OPTION,"The key option must be a string, a buffer or a function returning the algorithm secret or public key.");if(r&&"function"!==E){const e=i(r);a.length?u(a,e):a=e,r=d(r,e[0]===n[0])}if(f&&("number"!=typeof f||f<0))throw new e(e.codes.invalidOption,"The clockTimestamp option must be a positive number.");if(m&&("number"!=typeof m||m<0))throw new e(e.codes.invalidOption,"The clockTolerance option must be a positive number.");if(m=0,l&&("number"!=typeof l||l<0))throw new e(e.codes.invalidOption,"The cacheTTL option must be a positive number.");const S=[];y||S.push({type:"date",claim:"nbf",errorCode:"inactive",errorVerb:"will be active",greater:!0}),g||S.push({type:"date",claim:"exp",errorCode:"expired",errorVerb:"has expired"}),"number"==typeof w&&S.push({type:"date",claim:"iat",errorCode:"expired",errorVerb:"has expired",modifier:w}),T&&S.push({type:"string",claim:"jti",allowed:p(T)}),b&&S.push({type:"string",claim:"aud",allowed:p(b),array:!0}),v&&S.push({type:"string",claim:"iss",allowed:p(v)}),A&&S.push({type:"string",claim:"sub",allowed:p(A)}),x&&S.push({type:"string",claim:"nonce",allowed:p(x)});const $={key:r,allowedAlgorithms:a,complete:c,cacheTTL:l,clockTimestamp:f,clockTolerance:m,ignoreExpiration:g,ignoreNotBefore:y,maxAge:w,isAsync:"function"===E,validators:S,decode:o({complete:!0}),cache:h(s)},B=k.bind(null,$);return B.cache=$.cache,B}export{v as createVerifier};