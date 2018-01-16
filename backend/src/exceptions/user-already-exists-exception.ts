import { ApplicationException } from "n-exception";
import "n-ext";

export class UserAlreadyExistsException extends ApplicationException
{
    public constructor(email: string)
    {
        super(`User with email ${email} already exists.`);
    }
}