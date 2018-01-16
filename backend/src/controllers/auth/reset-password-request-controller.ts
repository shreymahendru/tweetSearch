import { Controller, route, httpPost, HttpException } from "n-web";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { Validator, strval } from "n-validate";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { MailerService } from "../../services/mailer-service/mailer-service";


@httpPost
@route(Routes.resetPasswordRequest)
@inject("UserRepository", "MailerService")
export class ResetPasswordRequestController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _mailerService: MailerService;

    public constructor(userRepository: UserRepository, mailerService: MailerService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(mailerService, "mailerService")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
        this._mailerService = mailerService;
    }


    public async execute(model: Model): Promise<any>
    {
        this.validateModel(model);
        
        let user = await this._userRepository.getUserByEmail(model.email);
       
        this._mailerService.sendResetPasswordEmail(user);

        return;
    }

    private validateModel(model: Model): void
    {
        let validator = new Validator<Model>();

        validator.for<string>("email")
            .isRequired()
            .useValidationRule(strval.hasMaxLength(100));

        validator.validate(model);
        if (validator.hasErrors)
            throw new HttpException(400, validator.errors);
    }
}

interface Model
{
    email: string;
}
