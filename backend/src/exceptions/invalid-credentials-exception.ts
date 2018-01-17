import { ApplicationException } from "n-exception";
import "n-ext";

export class InvalidCerdentialsException extends ApplicationException
{
    public constructor()
    {
        super(`Email or Password is incorrect`);
    }
}