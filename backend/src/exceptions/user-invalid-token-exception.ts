import { ApplicationException } from "n-exception";
import "n-ext";

export class UserInvalidTokenException extends ApplicationException
{
    public constructor()
    {
        super(`Invalid Token`);
    }
}