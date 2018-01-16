import { given } from "n-defensive";

export class SearchTerm
{
    private readonly _id: string;
    private readonly _term: string;
    private _numberOftimesSearched: number;
    
    public get id(): string { return this._id; }
    public get term(): string { return this._term; }
    public get numberOfTimesSearched(): number { return this._numberOftimesSearched; }
    
    public constructor(id: string, term: string, numberOfTimesSearched: number)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(term, "term")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(numberOfTimesSearched, "numberOfTimesSearched")
            .ensureHasValue()
            .ensureIsNumber();
        
        this._id = id;
        this._term = term;
        this._numberOftimesSearched = numberOfTimesSearched;
    }
    
    public increaseCount()
    {
        this._numberOftimesSearched++;
    }
}