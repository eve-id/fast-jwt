Object.defineProperty(exports,"__esModule",{value:!0});class _ extends Error{constructor(_,r,T){if(super(r),Error.captureStackTrace(this,this.constructor),this.code=_,T)for(const _ in T)this[_]=T[_]}}_.codes={invalidType:"FAST_JWT_INVALID_TYPE",invalidOption:"FAST_JWT_INVALID_OPTION",invalidAlgorithm:"FAST_JWT_INVALID_ALGORITHM",invalidClaimType:"FAST_JWT_INVALID_CLAIM_TYPE",invalidClaimValue:"FAST_JWT_INVALID_CLAIM_VALUE",invalidKey:"FAST_JWT_INVALID_KEY",invalidSignature:"FAST_JWT_INVALID_SIGNATURE",invalidPayload:"FAST_JWT_INVALID_PAYLOAD",malformed:"FAST_JWT_MALFORMED",inactive:"FAST_JWT_INACTIVE",expired:"FAST_JWT_EXPIRED",missingKey:"FAST_JWT_MISSING_KEY",keyFetchingError:"FAST_JWT_KEY_FETCHING_ERROR",signError:"FAST_JWT_SIGN_ERROR",verifyError:"FAST_JWT_VERIFY_ERROR"},_.wrap=function(r,T,i){return r instanceof _?r:new _(T,i,{originalError:r})},exports.TokenError=_;