import { ApplicationException } from "n-exception";
import "n-ext";

export class ValidationException extends ApplicationException
{
    private _errors: any;
    
    public get errors(): any { return this._errors; }
    
    public constructor(errors: any)
    {
        super("Validation error");
        this._errors = errors;
    }
}