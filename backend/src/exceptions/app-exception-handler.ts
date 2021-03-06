import { ExceptionHandler } from "n-web";
import { Exception } from "n-exception";
import { UserNotFoundException } from "./user-not-found-exception";
import { HttpException } from "n-web";
import { inject } from "n-ject";
import { Logger } from "./../services/logger-service/logger-service";
import { given } from "n-defensive";
import { UserAlreadyExistsException } from "./user-already-exists-exception";
import { SearchTermAlreadyExistsException } from "./search-term-already-exisits-exception";
import { UserTokenExpiredException } from "./user-token-expired-exception";
import { UserInvalidTokenException } from "./user-invalid-token-exception";
import { TweetRetrivalException } from "./tweet-retrival-exception";
import { InvalidCerdentialsException } from "./invalid-credentials-exception";
import { PasswordResetTokenInvalidException } from "./password-reset-token-invalid";
import { ValidationException } from "./validation-exception";

@inject("Logger")
export class AppExceptionHandler extends ExceptionHandler
{
    private readonly _logger: Logger;


    public constructor(logger: Logger)
    {
        given(logger, "logger").ensureHasValue();
        super();
        this._logger = logger;
    }


    public async handle(exp: Exception): Promise<any>
    {
        await this._logger.logError(exp);

        if (exp instanceof UserNotFoundException)
        {
            await this.handleUserNotFoundException(exp);
        }
        else if (exp instanceof UserAlreadyExistsException)
        {
            await this.handleUserAlreadyExistsException(exp as UserAlreadyExistsException);
        }
        else if (exp instanceof SearchTermAlreadyExistsException)
        {
            await this.handleSearchTermAlreadyExistsException(exp as SearchTermAlreadyExistsException)
        }
        else if (exp instanceof UserTokenExpiredException)
        {
            await this.handleUserTokenExpiredException(exp);
        }    
        else if (exp instanceof UserInvalidTokenException)
        {
            await this.handleUserInvalidTokenExceptionn(exp);
        }       
        else if (exp instanceof TweetRetrivalException)
        {
            await this.handleTweetRetrivalException(exp);
        }            
        else if (exp instanceof InvalidCerdentialsException)
        {
            await this.handleInvalidCerdentialsException(exp);
        }   
        else if (exp instanceof PasswordResetTokenInvalidException)
        {
            await this.handlePasswordResetTokenInvalidException(exp);
        }       
        else if (exp instanceof ValidationException)
        {
            await this.handleValidationExeption(exp);
        }    
        else
        {
            throw new HttpException(500, "We encountered a problem while processing your request");
        }
    }

    private async handleUserNotFoundException(exp: UserNotFoundException): Promise<any>
    {
        await this._logger.logError(exp);
        throw new HttpException(404, {
            errors: {
            global: exp.message
        }});
    }
    
    private async handleUserAlreadyExistsException(exp: UserAlreadyExistsException): Promise<any>
    {
        await this._logger.logError(exp);
        throw new HttpException(409, exp.message);
    }
    
    private async handleSearchTermAlreadyExistsException(exp: SearchTermAlreadyExistsException): Promise<any>
    {
        await this._logger.logError(exp);
        throw new HttpException(500, "We encountered a problem while processing your request");
    }
    
    private async handleUserTokenExpiredException(exp: UserTokenExpiredException)
    {
        await this._logger.logInfo("Token Expired");
        throw new HttpException(401, "Token has expired");
    }
    
    private async handleUserInvalidTokenExceptionn(exp: UserInvalidTokenException)
    {
        await this._logger.logInfo("Invalid Token");
        throw new HttpException(401, "Token is Invalid");
    }
    
    private async handleTweetRetrivalException(exp: TweetRetrivalException)
    {
        await this._logger.logError("Can't contact twitter.");
        throw new HttpException(500, exp.message);
    }
    
    private async handleInvalidCerdentialsException(exp: InvalidCerdentialsException)
    {
        await this._logger.logWarning("Invalid Creds.");
        throw new HttpException(401, { errors: { global: exp.message } });
    }
    
    private async handlePasswordResetTokenInvalidException(exp: PasswordResetTokenInvalidException)
    {
        await this._logger.logWarning("Invalid password reset token");
        throw new HttpException(401, {
            errors: {
                global: exp.message
            }
        });
    }
    
    private async handleValidationExeption(exp: ValidationException)
    {
        await this._logger.logError(JSON.stringify(exp.message));
        throw new HttpException(400, {
            errors: exp.errors
        });
    }
}
