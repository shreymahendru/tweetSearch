import { given } from "n-defensive";
import { SearchTerm } from "../search-term";

export class UserSearchTerm
{
    private readonly _id: string;
    private readonly _searchterm: SearchTerm;
    private _timeOfSearch: number;
    
    public get id(): string { return this._id; }
    public get searchTerm(): SearchTerm { return this._searchterm; }
    public get timeOfSearch(): number { return this._timeOfSearch; }
    
    public constructor(id: string, searchterm: SearchTerm, timeOfSearch: number)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(searchterm, "searchterm")
            .ensureHasValue()
            .ensureIsObject();
        
        given(timeOfSearch, "timeOfSearch")
            .ensureHasValue()
            .ensureIsNumber();
        
        this._id = id;
        this._searchterm = searchterm;
        this._timeOfSearch = timeOfSearch;
    }
    
}