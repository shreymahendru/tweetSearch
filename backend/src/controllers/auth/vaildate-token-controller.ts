import { Controller, route, httpPost } from "n-web";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator } from "n-validate";
import { TokenService } from "../../services/token-service/token-service";
import { PasswordResetTokenInvalidException } from "../../exceptions/password-reset-token-invalid";
import { ValidationException } from "../../exceptions/validation-exception";


@httpPost
@route(Routes.validateToken)
@inject("TokenService")
export class ValidateTokenController extends Controller
{
    private readonly _tokenService: TokenService;

    public constructor(tokenService: TokenService)
    {
        given(tokenService, "tokenService")
            .ensureHasValue();

        super();
        this._tokenService = tokenService;
    }


    public async execute(model: Model): Promise<any>
    {
        console.log(model);
        this.validateModel(model);

        let isValid = this._tokenService.verifyToken(model.token);
        
        if (!isValid)
            throw new PasswordResetTokenInvalidException();    

        return;
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        console.log(model);
        validator.for<string>("token")
            .isRequired();

        validator.validate(model);
        if (validator.hasErrors)
            throw new ValidationException(validator.errors);
    }
}

interface Model
{
    token: string;
}
