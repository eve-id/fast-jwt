Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./crypto-8485f492.js"),r=require("./error.js"),o=require("./utils.js"),t=require("crypto");require("ecdsa-sig-formatter");const n=Array.from(new Set([...e.hsAlgorithms,...e.esAlgorithms,...e.rsaAlgorithms,...e.edAlgorithms,"none"])).join(", ");function i(e,o){const t=e.slice(0,2),n=o.slice(0,2);let i=!0;if("RS"===t||"PS"===t?i="RS"===n:"ES"!==t&&"Ed"!==t||(i=t===n),!i)throw new r.TokenError(r.TokenError.codes.invalidKey,`Invalid private key provided for algorithm ${e}.`)}function s(r,o){return"string"==typeof r&&(r=Buffer.from(r,"utf-8")),e.useNewCrypto&&(r="H"===o[0]?t.createSecretKey(r):t.createPrivateKey(r)),r}function a({key:t,algorithm:n,noTimestamp:a,mutatePayload:c,clockTimestamp:f,expiresIn:l,notBefore:p,kid:u,typ:d,isAsync:m,additionalHeader:h,fixedPayload:T},k,y){const[g,b]=m?o.ensurePromiseCallback(y):[];if("object"!=typeof k)throw new r.TokenError(r.TokenError.codes.invalidType,"The payload must be an object.");if(k.exp&&(!Number.isInteger(k.exp)||k.exp<0))throw new r.TokenError(r.TokenError.codes.invalidClaimValue,"The exp claim must be a positive integer.");const E={alg:n,typ:d||"JWT",kid:u,...h};let w="";const v=1e3*k.iat||f||Date.now(),O={...k,...T,iat:a?void 0:Math.floor(v/1e3),exp:l?Math.floor((v+l)/1e3):k.exp||void 0,nbf:p?Math.floor((v+p)/1e3):void 0};if(c&&Object.assign(k,O),w=Buffer.from(JSON.stringify(O),"utf-8").toString("base64").replace(e.base64UrlMatcher,e.base64UrlReplacer),!g){const r=Buffer.from(JSON.stringify(E),"utf-8").toString("base64").replace(e.base64UrlMatcher,e.base64UrlReplacer)+"."+w;return r+"."+("none"===n?"":e.createSignature(n,t,r))}return o.getAsyncKey(t,E,((o,t)=>{if(o){const e=r.TokenError.wrap(o,r.TokenError.codes.keyFetchingError,"Cannot fetch key.");return g(e)}if("string"==typeof t)t=Buffer.from(t,"utf-8");else if(!(t instanceof Buffer))return g(new r.TokenError(r.TokenError.codes.keyFetchingError,"The key returned from the callback must be a string or a buffer containing a secret or a private key."));let a;try{const r=e.detectPrivateKeyAlgorithm(t);n?i(n,r):E.alg=n=r,t=s(t,n);const o=Buffer.from(JSON.stringify(E),"utf-8").toString("base64").replace(e.base64UrlMatcher,e.base64UrlReplacer)+"."+w;a=o+"."+e.createSignature(n,t,o)}catch(e){return g(e)}g(null,a)})),b}exports.createSigner=function(o){let{key:t,algorithm:c,noTimestamp:f,mutatePayload:l,clockTimestamp:p,expiresIn:u,notBefore:d,jti:m,aud:h,iss:T,sub:k,nonce:y,kid:g,typ:b,header:E}={clockTimestamp:0,...o};if(c&&"none"!==c&&!e.hsAlgorithms.includes(c)&&!e.esAlgorithms.includes(c)&&!e.rsaAlgorithms.includes(c)&&!e.edAlgorithms.includes(c))throw new r.TokenError(r.TokenError.codes.invalidOption,`The algorithm option must be one of the following values: ${n}.`);const w=typeof t;if("none"===c){if(t)throw new r.TokenError(r.TokenError.codes.invalidOption,'The key option must not be provided when the algorithm option is "none".')}else if(!t||"string"!==w&&!(t instanceof Buffer)&&"function"!==w)throw new r.TokenError(r.TokenError.codes.invalidOption,"The key option must be a string, a buffer or a function returning the algorithm secret or private key.");if(t&&"function"!==w){const r=e.detectPrivateKeyAlgorithm(t);c?i(c,r):c=r,t=s(t,c)}if(u&&("number"!=typeof u||u<0))throw new r.TokenError(r.TokenError.codes.invalidOption,"The expiresIn option must be a positive number.");if(d&&("number"!=typeof d||d<0))throw new r.TokenError(r.TokenError.codes.invalidOption,"The notBefore option must be a positive number.");if(p&&("number"!=typeof p||p<0))throw new r.TokenError(r.TokenError.codes.invalidOption,"The clockTimestamp option must be a positive number.");if(m&&"string"!=typeof m)throw new r.TokenError(r.TokenError.codes.invalidOption,"The jti option must be a string.");if(h&&"string"!=typeof h&&!Array.isArray(h))throw new r.TokenError(r.TokenError.codes.invalidOption,"The aud option must be a string or an array of strings.");if(T&&"string"!=typeof T)throw new r.TokenError(r.TokenError.codes.invalidOption,"The iss option must be a string.");if(k&&"string"!=typeof k)throw new r.TokenError(r.TokenError.codes.invalidOption,"The sub option must be a string.");if(y&&"string"!=typeof y)throw new r.TokenError(r.TokenError.codes.invalidOption,"The nonce option must be a string.");if(g&&"string"!=typeof g)throw new r.TokenError(r.TokenError.codes.invalidOption,"The kid option must be a string.");if(E&&"object"!=typeof E)throw new r.TokenError(r.TokenError.codes.invalidOption,"The header option must be a object.");const v={jti:m,aud:h,iss:T,sub:k,nonce:y},O={key:t,algorithm:c,noTimestamp:f,mutatePayload:l,clockTimestamp:p,expiresIn:u,notBefore:d,kid:g,typ:b,isAsync:"function"===w,additionalHeader:E,fixedPayload:Object.keys(v).reduce(((e,r)=>void 0!==v[r]?Object.assign(e,{[r]:v[r]}):e),{})};return a.bind(null,O)};
