Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./error.js"),r=require("crypto"),o=require("./crypto-7c2eb296.js");require("ecdsa-sig-formatter");var t=require("./utils.js");const n=Array.from(new Set([...o.hsAlgorithms,...o.esAlgorithms,...o.rsaAlgorithms,...o.edAlgorithms,"none"])).join(", ");function i(r,o){const t=r.slice(0,2),n=o.slice(0,2);let i=!0;if("RS"===t||"PS"===t?i="RS"===n:"ES"!==t&&"Ed"!==t||(i=t===n),!i)throw new e.TokenError(e.TokenError.codes.invalidKey,`Invalid private key provided for algorithm ${r}.`)}function s(e,t){return"string"==typeof e&&(e=Buffer.from(e,"utf-8")),o.useNewCrypto&&(e="H"===t[0]?r.createSecretKey(e):r.createPrivateKey(e)),e}function a({key:r,algorithm:n,noTimestamp:a,mutatePayload:c,clockTimestamp:f,expiresIn:l,notBefore:u,kid:d,isAsync:p,additionalHeader:h,fixedPayload:m},k,T){const[g,y]=p?t.ensurePromiseCallback(T):[];if("object"!=typeof k)throw new e.TokenError(e.TokenError.codes.invalidType,"The payload must be a object, a string or a buffer.");const b={alg:n,typ:"JWT",kid:d,...h};let E="";const w=1e3*k.iat||f||Date.now(),v={...k,...m,iat:a?void 0:Math.floor(w/1e3),exp:l?Math.floor((w+l)/1e3):void 0,nbf:u?Math.floor((w+u)/1e3):void 0};if(c&&Object.assign(k,v),E=Buffer.from(JSON.stringify(v),"utf-8").toString("base64").replace(o.base64UrlMatcher,o.base64UrlReplacer),!g){const e=Buffer.from(JSON.stringify(b),"utf-8").toString("base64").replace(o.base64UrlMatcher,o.base64UrlReplacer)+"."+E;return e+"."+("none"===n?"":o.createSignature(n,r,e))}return t.getAsyncKey(r,b,(r,t)=>{if(r){const o=e.TokenError.wrap(r,e.TokenError.codes.keyFetchingError,"Cannot fetch key.");return g(o)}if("string"==typeof t)t=Buffer.from(t,"utf-8");else if(!(t instanceof Buffer))return g(new e.TokenError(e.TokenError.codes.keyFetchingError,"The key returned from the callback must be a string or a buffer containing a secret or a private key."));let a;try{const e=o.detectPrivateKeyAlgorithm(t);n?i(n,e):b.alg=n=e,t=s(t,n);const r=Buffer.from(JSON.stringify(b),"utf-8").toString("base64").replace(o.base64UrlMatcher,o.base64UrlReplacer)+"."+E;a=r+"."+o.createSignature(n,t,r)}catch(e){return g(e)}g(null,a)}),y}exports.createSigner=function(r){let{key:t,algorithm:c,noTimestamp:f,mutatePayload:l,clockTimestamp:u,expiresIn:d,notBefore:p,jti:h,aud:m,iss:k,sub:T,nonce:g,kid:y,header:b}={clockTimestamp:0,...r};if(c&&"none"!==c&&!o.hsAlgorithms.includes(c)&&!o.esAlgorithms.includes(c)&&!o.rsaAlgorithms.includes(c)&&!o.edAlgorithms.includes(c))throw new e.TokenError(e.TokenError.codes.invalidOption,`The algorithm option must be one of the following values: ${n}.`);const E=typeof t;if("none"===c){if(t)throw new e.TokenError(e.TokenError.codes.invalidOption,'The key option must not be provided when the algorithm option is "none".')}else if(!t||"string"!==E&&!(t instanceof Buffer)&&"function"!==E)throw new e.TokenError(e.TokenError.codes.invalidOption,"The key option must be a string, a buffer or a function returning the algorithm secret or private key.");if(t&&"function"!==E){const e=o.detectPrivateKeyAlgorithm(t);c?i(c,e):c=e,t=s(t,c)}if(d&&("number"!=typeof d||d<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The expiresIn option must be a positive number.");if(p&&("number"!=typeof p||p<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The notBefore option must be a positive number.");if(u&&("number"!=typeof u||u<0))throw new e.TokenError(e.TokenError.codes.invalidOption,"The clockTimestamp option must be a positive number.");if(h&&"string"!=typeof h)throw new e.TokenError(e.TokenError.codes.invalidOption,"The jti option must be a string.");if(m&&"string"!=typeof m&&!Array.isArray(m))throw new e.TokenError(e.TokenError.codes.invalidOption,"The aud option must be a string or an array of strings.");if(k&&"string"!=typeof k)throw new e.TokenError(e.TokenError.codes.invalidOption,"The iss option must be a string.");if(T&&"string"!=typeof T)throw new e.TokenError(e.TokenError.codes.invalidOption,"The sub option must be a string.");if(g&&"string"!=typeof g)throw new e.TokenError(e.TokenError.codes.invalidOption,"The nonce option must be a string.");if(y&&"string"!=typeof y)throw new e.TokenError(e.TokenError.codes.invalidOption,"The kid option must be a string.");if(b&&"object"!=typeof b)throw new e.TokenError(e.TokenError.codes.invalidOption,"The header option must be a object.");const w={jti:h,aud:m,iss:k,sub:T,nonce:g},v={key:t,algorithm:c,noTimestamp:f,mutatePayload:l,clockTimestamp:u,expiresIn:d,notBefore:p,kid:y,isAsync:"function"===E,additionalHeader:b,fixedPayload:Object.keys(w).reduce((e,r)=>void 0!==w[r]?Object.assign(e,{[r]:w[r]}):e,{})};return a.bind(null,v)};