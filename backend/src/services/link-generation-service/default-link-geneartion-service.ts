import { LinkGenerationService } from "./link-generation-service";
import { User } from "../../domain/models/user";
import { given } from "n-defensive";
import { inject } from "n-ject";
import { ConfigService } from "../config-service/config-service";
import * as Routes from "./../../controllers/routes";
import { TokenService } from "../token-service/token-service";

@inject("ConfigService", "TokenService")
export class DefaultLinkGenerationService implements LinkGenerationService
{
    private readonly _configService: ConfigService;
    private readonly _tokenService: TokenService;
    
    public constructor(configService: ConfigService, tokenService: TokenService)
    {
        given(configService, "configService")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();

        this._configService = configService;
        this._tokenService = tokenService;
    }
    
    
    public generateResetPasswordLink(user: User): string
    {
        given(user, "user")
            .ensureHasValue();

        let baseUrl = this._configService.getBaseUrl();

        baseUrl = baseUrl[baseUrl.length - 1] === "/" ? baseUrl : baseUrl + "/";
        let token = this._tokenService.generateResetPasswordToken(user.id);
        let route = Routes.resetPassword.substring(0, Routes.resetPassword.lastIndexOf("/"));
        let url = `${baseUrl}/${route}/${token}`;
        return url;
    }
    
    public generateEmailConfirmationLink(user: User): string
    {    
        given(user, "user")
            .ensureHasValue();

        let baseUrl = this._configService.getBaseUrl();

        baseUrl = baseUrl[baseUrl.length - 1] === "/" ? baseUrl : baseUrl + "/";
        let route = Routes.confirmEmail.substring(0, Routes.confirmEmail.lastIndexOf("/"))
        let url = `${baseUrl}/${route}/${user.confirmationToken}`;
        return url;
    }
}