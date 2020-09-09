Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./error.js"),r=require("./decoder.js"),o=require("crypto"),t=require("./crypto-7c2eb296.js");require("ecdsa-sig-formatter");var n=require("./utils.js");function i(r,o){const t=r[0].slice(0,2),n=o[0].slice(0,2);let i=!0;if("RS"===t||"PS"===t?i="RS"===n:"ES"!==t&&"Ed"!==t||(i=t===n),!i)throw new e.TokenError(e.TokenError.codes.invalidKey,`Invalid public key provided for algorithms ${r.join(", ")}.`)}function a(e,r){return"string"==typeof e&&(e=Buffer.from(e,"utf-8")),t.useNewCrypto&&(e=r?o.createSecretKey(e):o.createPublicKey(e)),e}function c(e){return Array.isArray(e)||(e=[e]),e.map(e=>e&&"function"==typeof e.test?e:new RegExp(e.toString()))}function l(e){const r=parseInt(!0===e?1e3:e,10);return r>0?new t.lruCache(r):null}function s({cache:e,token:r,cacheTTL:o,payload:t,ignoreExpiration:i,ignoreNotBefore:a,maxAge:c,clockTimestamp:l,clockTolerance:s},u){if(!e)return u;const d=[u,0,0];t&&"number"==typeof t.iat&&(d[1]=a||"number"!=typeof t.nbf?0:1e3*t.nbf,i||("number"==typeof t.exp?d[2]=1e3*t.exp:c&&(d[2]=1e3*t.iat+c)));const f=(l||Date.now())+s+o;return d[2]=0===d[2]?f:Math.min(d[2],f),e.set(n.hashToken(r),d),u}function u(r,o,t,n){const i=t?`The ${o} claim must be a ${n} or an array of ${n}s.`:`The ${o} claim must be a ${n}.`;if(r.map(e=>typeof e).some(e=>e!==n))throw new e.TokenError(e.TokenError.codes.invalidClaimType,i)}function d(r,o,t,n){const i=n?`None of ${o} claim values is allowed.`:`The ${o} claim value is not allowed.`;if(!r.some(e=>t.some(r=>r.test(e))))throw new e.TokenError(e.TokenError.codes.invalidClaimValue,i)}function f(r,o,t,n,i,a){const c=1e3*r+(o||0);if(!(n?t>=c:t<=c))throw new e.TokenError(e.TokenError.codes[i],`The token ${a} at ${new Date(c).toISOString()}.`)}function h(r,{input:o,header:n,payload:i,signature:a},{validators:c,allowedAlgorithms:l,clockTimestamp:s,clockTolerance:h}){const m=r instanceof Buffer?r.length:!!r;if(m&&!a)throw new e.TokenError(e.TokenError.codes.missingSignature,"The token signature is missing.");if(!m&&a)throw new e.TokenError(e.TokenError.codes.missingKey,"The key option is missing.");!function(r,o,n,i,a){if(!a.includes(o.alg))throw new e.TokenError(e.TokenError.codes.invalidAlgorithm,"The token algorithm is invalid.");if(n&&!t.verifySignature(o.alg,i,r,n))throw new e.TokenError(e.TokenError.codes.invalidSignature,"The token signature is invalid.")}(o,n,a,r,l);const p=(s||Date.now())+h;for(const e of c){const{type:r,claim:o,allowed:t,array:n,modifier:a,greater:c,errorCode:l,errorVerb:s}=e,h=i[o],m=Array.isArray(h),T=m?h:[h];o in i&&(u(T,o,n,"date"===r?"number":"string"),"date"===r?f(h,a,p,c,l,s):d(T,o,t,m))}}function m({key:r,allowedAlgorithms:o,complete:c,cacheTTL:l,clockTimestamp:u,clockTolerance:d,ignoreExpiration:f,ignoreNotBefore:m,maxAge:p,isAsync:T,validators:g,decode:y,cache:k},w,b){const[E,v]=T?n.ensurePromiseCallback(b):[],A={cache:k,token:w,cacheTTL:l,payload:void 0,ignoreExpiration:f,ignoreNotBefore:m,maxAge:p,clockTimestamp:u,clockTolerance:d};if(k){const[r,o,t]=k.get(n.hashToken(w))||[void 0,0,0],i=(u||Date.now())+d;if(void 0!==r&&(0===o||i>o)&&(0===t||i<=t))return function(r,o,t){if(r instanceof e.TokenError){if(!o)throw r;o(r)}else{if(!o)return r;o(null,r)}return t}(r,E,v)}let x;try{x=y(w)}catch(e){if(E)return E(e),v;throw e}const{header:S,payload:C,signature:N}=x;A.payload=C;const $={validators:g,allowedAlgorithms:o,clockTimestamp:u,clockTolerance:d};if(!E)try{return h(r,x,$),s(A,c?{header:S,payload:C,signature:N}:C)}catch(e){throw s(A,e)}return n.getAsyncKey(r,S,(r,n)=>{if(r)return E(s(A,e.TokenError.wrap(r,e.TokenError.codes.keyFetchingError,"Cannot fetch key.")));if("string"==typeof n)n=Buffer.from(n,"utf-8");else if(!(n instanceof Buffer))return E(s(A,new e.TokenError(e.TokenError.codes.keyFetchingError,"The key returned from the callback must be a string or a buffer containing a secret or a public key.")));try{const e=t.detectPublicKeyAlgorithms(n);$.allowedAlgorithms.length?i(o,e):$.allowedAlgorithms=e,h(n=a(n,e[0]===t.hsAlgorithms[0]),x,$)}catch(e){return E(s(A,e))}E(null,s(A,c?{header:S,payload:C,signature:N}:C))}),v}exports.createVerifier=function(o){let{key:n,algorithms:s,complete:u,cache:d,cacheTTL:f,clockTimestamp:h,clockTolerance:p,ignoreExpiration:T,ignoreNotBefore:g,maxAge:y,allowedJti:k,allowedAud:w,allowedIss:b,allowedSub:E,allowedNonce:v}={cacheTTL:6e5,...o};Array.isArray(s)||(s=[]);const A=typeof n;if("string"!==A&&"object"!==A&&"function"!==A)throw new e.TokenError(e.TokenError.codes.INVALID_OPTION,"The key option must be a string, a buffer or a function returning the algorithm secret or public key.");if(n&&"function"!==A){const e=t.detectPublicKeyAlgorithms(n);s.length?i(s,e):s=e,n=a(n,e[0]===t.hsAlgorithms[0])}if(h&&("number"!=typeof h||h<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The clockTimestamp option must be a positive number.");if(p&&("number"!=typeof p||p<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The clockTolerance option must be a positive number.");if(p=0,f&&("number"!=typeof f||f<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The cacheTTL option must be a positive number.");const x=[];g||x.push({type:"date",claim:"nbf",errorCode:"inactive",errorVerb:"will be active",greater:!0}),T||x.push({type:"date",claim:"exp",errorCode:"expired",errorVerb:"has expired"}),"number"==typeof y&&x.push({type:"date",claim:"iat",errorCode:"expired",errorVerb:"has expired",modifier:y}),k&&x.push({type:"string",claim:"jti",allowed:c(k)}),w&&x.push({type:"string",claim:"aud",allowed:c(w),array:!0}),b&&x.push({type:"string",claim:"iss",allowed:c(b)}),E&&x.push({type:"string",claim:"sub",allowed:c(E)}),v&&x.push({type:"string",claim:"nonce",allowed:c(v)});const S={key:n,allowedAlgorithms:s,complete:u,cacheTTL:f,clockTimestamp:h,clockTolerance:p,ignoreExpiration:T,ignoreNotBefore:g,maxAge:y,isAsync:"function"===A,validators:x,decode:r.createDecoder({complete:!0}),cache:l(d)},C=m.bind(null,S);return C.cache=S.cache,C};
