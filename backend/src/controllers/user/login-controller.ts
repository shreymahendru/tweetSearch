import { Controller, route, httpPost } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { HashingService } from "../../services/hashing-service/hashing-service";
import { TokenService } from "../../services/token-service/token-service";
import { InvalidCerdentialsException } from "../../exceptions/invalid-credentials-exception";
import { UserNotFoundException } from "../../exceptions/user-not-found-exception";
import { ValidationException } from "../../exceptions/validation-exception";


@httpPost
@route(Routes.loginUser)
@inject("UserRepository", "HashingService", "TokenService")
export class LoginController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _hashingService: HashingService;
    private readonly _tokenService: TokenService;

    public constructor(userRepository: UserRepository,
        hashingService: HashingService, tokenService: TokenService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(hashingService, "hashingService")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
        this._hashingService = hashingService;
        this._tokenService = tokenService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);

        let user = await this._userRepository.getUserByEmail(model.email);
        
        if (!user)
            throw new UserNotFoundException(model.email);    
        
        let isPasswordValid = user.isPasswordValid(model.password, this._hashingService);
        
        if (!isPasswordValid)
            throw new InvalidCerdentialsException();
            
        
        let token = this._tokenService.generateAuthToken(user);
        
        return {
            id: user.id,
            name: user.name,
            token: token,
            email: user.email, 
            isConfirmed: user.isConfirmedEmail
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();

        validator.for<string>("email")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));
        validator.for<string>("password")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new ValidationException(validator.errors);
    }
}

interface Model
{
    email: string;
    password: string;
}
