import { ApplicationException } from "n-exception";
import "n-ext";

export class UserTokenExpiredException extends ApplicationException
{
    public constructor()
    {
        super(`Token Expired`);
    }
}