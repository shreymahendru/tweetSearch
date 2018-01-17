import { ApplicationException } from "n-exception";
import "n-ext";

export class PasswordResetTokenInvalidException extends ApplicationException
{
    public constructor()
    {
        super(`Token to reset password is invalid.`);
    }
}