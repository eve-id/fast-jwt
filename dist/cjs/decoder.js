Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./error.js");function r({complete:r,checkTyp:o},t){if(t instanceof Buffer)t=t.toString("utf-8");else if("string"!=typeof t)throw new e.TokenError(e.TokenError.codes.invalidType,"The token must be a string or a buffer.");const n=t.indexOf("."),a=t.lastIndexOf(".");if(-1===n||n>=a)throw new e.TokenError(e.TokenError.codes.malformed,"The token is malformed.");let i=!1;try{const s=JSON.parse(Buffer.from(t.slice(0,n),"base64").toString("utf-8"));if(o&&s.typ!==o)throw new e.TokenError(e.TokenError.codes.invalidType,`The type must be "${o}".`,{header:s});i=!0;let c=Buffer.from(t.slice(n+1,a),"base64").toString("utf-8");if(c=JSON.parse(c),!c||"object"!=typeof c)throw new e.TokenError(e.TokenError.codes.invalidPayload,"The payload must be an object",{payload:c});return r?{header:s,payload:c,signature:t.slice(a+1),input:t.slice(0,a)}:c}catch(r){throw e.TokenError.wrap(r,e.TokenError.codes.malformed,`The token ${i?"payload":"header"} is not a valid base64url serialized JSON.`)}}exports.createDecoder=function(e={}){const o=e.complete||!1,t=e.checkTyp;return r.bind(null,{complete:o,checkTyp:t})};