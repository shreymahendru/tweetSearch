import { AuthenticationHandler } from "n-web";
import { ClaimsIdentity, Claim } from "n-sec";
import { inject } from "n-ject";
import { TokenService } from "../services/token-service/token-service";
import { given } from "n-defensive";
import { UserInvalidTokenException } from "../exceptions/user-invalid-token-exception";

@inject("TokenService")
export class AuthHandler implements AuthenticationHandler
{
    private readonly _tokenService: TokenService; 
    
    public constructor(tokenService: TokenService)
    {
        given(tokenService, "tokenService")
            .ensureHasValue();
        this._tokenService = tokenService; 
    }
    
    public authenticate(scheme: string, token: string): Promise<ClaimsIdentity>
    {        
        let identity: ClaimsIdentity = null;
        
        if (scheme === "bearer" && this._tokenService.verifyToken(token))
            identity = new ClaimsIdentity([new Claim("authClaim", true)]);
        else
            throw new UserInvalidTokenException();    

        return Promise.resolve(identity);
    }
    
}
