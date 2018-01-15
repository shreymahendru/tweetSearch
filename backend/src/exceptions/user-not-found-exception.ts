import { ApplicationException } from "n-exception";
import "n-ext";

export class UserNotFoundException extends ApplicationException
{
    public constructor(id: string)
    {
        super(`User with id ${id} not found`);
    }
}