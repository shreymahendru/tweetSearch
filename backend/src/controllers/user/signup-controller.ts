import { Controller, route, httpPost } from "n-web";
import { UserFactory } from "../../domain/factories/user-factory/user-factory";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { MailerService } from "../../services/mailer-service/mailer-service";
import { TokenService } from "../../services/token-service/token-service";
import { ValidationException } from "../../exceptions/validation-exception";


@httpPost
@route(Routes.signupUser)
@inject("UserFactory", "UserRepository", "MailerService", "TokenService")
export class SignupController extends Controller
{
    private readonly _userFactory: UserFactory;
    private readonly _userRepository: UserRepository;
    private readonly _mailerService: MailerService;
    private readonly _tokenService: TokenService;

    public constructor(userFactory: UserFactory,
        userRepository: UserRepository, mailerService: MailerService,
        tokenService: TokenService)
    {
        given(userFactory, "userFactory")
            .ensureHasValue();
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(mailerService, "mailerService")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();
        
        super();
        this._userFactory = userFactory;
        this._userRepository = userRepository;
        this._mailerService = mailerService;
        this._tokenService = tokenService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);

        let newUser = await this._userFactory.create(model.email, model.name, model.password);

        await this._userRepository.save(newUser);
        
        this._mailerService.sendEmailConfirmationEmail(newUser);
    
        let authToken = this._tokenService.generateAuthToken(newUser);
        
        return {
            id: newUser.id,
            token: authToken,
            name: newUser.name,
            email: newUser.email,
            isConfirmed: newUser.isConfirmedEmail
        };
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();
        validator.for<string>("name")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(20));
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
    name: string;
    email: string;
    password: string;
}
