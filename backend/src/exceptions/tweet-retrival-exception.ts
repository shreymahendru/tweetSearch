import { ApplicationException } from "n-exception";
import "n-ext";

export class TweetRetrivalException extends ApplicationException
{
    public constructor()
    {
        super(`Error contacting Twitter... Sorry try again...`);
    }
}