import { TokenService } from "./token-service";
import { given } from "n-defensive";
import { sign, verify, TokenExpiredError, decode, JsonWebTokenError } from "jsonwebtoken";
import { inject } from "n-ject";
import { ConfigService } from "../config-service/config-service";
import { UserTokenExpiredException } from "../../exceptions/user-token-expired-exception";
import { UserInvalidTokenException } from "../../exceptions/user-invalid-token-exception";
import { ApplicationException } from "n-exception";


@inject("ConfigService")
export class DefaultTokenService implements TokenService
{
    private readonly _configService: ConfigService;
    
    public constructor(configService: ConfigService)
    {
        given(configService, "configService")
            .ensureHasValue()
            .ensureIsObject();
        
        this._configService = configService;
    }
    
    public generateEmailConfirmationToken(email: string): string
    {
        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let secret = this._configService.getJWTSecret();
        let token = sign({ email }, secret);
        return token;
    }
    
    public generateResetPasswordToken(id: string): string
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let secret = this._configService.getJWTSecret();
        let ttl = this._configService.getTokenTTL();
        
        let token = sign({ id }, secret, { expiresIn: ttl });
        return token;
    }
    
    public verifyToken(token: string): boolean
    {
        given(token, "token")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let secret = this._configService.getJWTSecret();
        try
        {
            let decoded = verify(token, secret);   
        }
        catch (err)
        {
            return false;
        }
        return true;
    }
    
    public decodeToken<T>(token: string): T
    {
        given(token, "token")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        let secret = this._configService.getJWTSecret();
        try
        {
            let decoded = verify(token, secret);
            return decoded as T;
        }
        catch (err)
        {
            if (err instanceof TokenExpiredError)
                throw new UserTokenExpiredException();
            if (err instanceof JsonWebTokenError)
                throw new UserInvalidTokenException();
            else
                throw new ApplicationException(err);    
        }
    }
    
}