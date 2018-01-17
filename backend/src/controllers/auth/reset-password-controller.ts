import { Controller, route, httpPost } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { TokenService } from "../../services/token-service/token-service";
import { HashingService } from "../../services/hashing-service/hashing-service";
import { ValidationException } from "../../exceptions/validation-exception";
// import { authClaim } from "../../security/app-claims";


@httpPost
@route(Routes.resetPassword)
@inject("UserRepository", "TokenService", "HashingService")
export class ResetPasswordController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _tokenService: TokenService;
    private readonly _hashingService: HashingService;
    // private readonly _callContext: CallContext;

    public constructor(userRepository: UserRepository,
        tokenService: TokenService, hashingService: HashingService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();
        given(hashingService, "hashingService")
            .ensureHasValue();
        
        super();
        this._userRepository = userRepository;
        this._tokenService = tokenService;
        this._hashingService = hashingService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);
        
        // let token = this._callContext.authToken;

        let { id } = this._tokenService.decodeToken<{ id: string }>(model.token);
        
        let user = await this._userRepository.get(id);

        user.setNewPassword(model.newPassword, this._hashingService);
        
        await this._userRepository.save(user);
        return;
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        
        validator.for<string>("newPassword")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));
        
        validator.for<string>("token")
            .isRequired();

        validator.validate(model);
        if (validator.hasErrors)
            throw new ValidationException(validator.errors);
    }
}

interface Model
{
    newPassword: string;
    token: string;
}
