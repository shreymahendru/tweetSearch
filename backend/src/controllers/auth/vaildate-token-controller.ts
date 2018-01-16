import { Controller, route, httpPost, HttpException } from "n-web";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { TokenService } from "../../services/token-service/token-service";


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
        this.validateModel(model);

        let isValid = this._tokenService.verifyToken(model.token);
        
        if (!isValid)
            throw new HttpException(401, "Ivanlid Token");    

        return;
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();

        validator.for<string>("token")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    token: string;
}
