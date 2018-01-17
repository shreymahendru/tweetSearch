import { ApplicationException } from "n-exception";
import "n-ext";

export class UserNotFoundException extends ApplicationException
{
    public constructor(email: string)
    {
        super(`User with ${email} not found`);
    }
}