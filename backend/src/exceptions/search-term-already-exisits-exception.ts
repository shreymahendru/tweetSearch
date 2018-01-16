import { ApplicationException } from "n-exception";
import "n-ext";

export class SearchTermAlreadyExistsException extends ApplicationException
{
    public constructor(term: string)
    {
        super(`Term: ${term} with already exists.`);
    }
}