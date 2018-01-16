import { Controller, route, httpPost, HttpException } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { TokenService } from "../../services/token-service/token-service";


@httpPost
@route(Routes.confirmEmail)
@inject("UserRepository", "TokenService")
export class ConfirmEmailController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _tokenService: TokenService;

    public constructor(userRepository: UserRepository,
        tokenService: TokenService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
        this._tokenService = tokenService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);
        
        let { email } = this._tokenService.decodeToken<{ email: string }>(model.confirmationToken);
        
        let user = await this._userRepository.getUserByEmail(email);
        
        user.confirmEmail();
        await this._userRepository.save(user);
        
        let token = this._tokenService.generateAuthToken(user);

        return {
            id: user.id,
            name: user.name,
            token: token,
            email: user.email
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();

        validator.for<string>("confirmationToken")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    confirmationToken: string;
}
