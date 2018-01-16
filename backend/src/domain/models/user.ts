import { given } from "n-defensive";
import { HashingService } from "../../services/hashing-service/hashing-service";
import { SearchTerm } from "./search-term";
import { UserSearchTerm } from "./value-objects/user-search-term";
import * as uuid from "uuid";

export class User
{
    private readonly _id: string;
    private _name: string;
    private _email: string;
    private _isConfirmedEmail: boolean;
    private _confirmationToken: string;
    private _passwordHash: string;
    private _searchHistory: Array<UserSearchTerm>;
    
    public get id(): string { return this._id; }
    public get email(): string { return this._email; }
    public get name(): string { return this._name; }
    public get isConfirmedEmail(): boolean { return this._isConfirmedEmail; }
    public get confirmationToken(): string { return this._confirmationToken;}
    public get searchHistory(): Array<UserSearchTerm> { return this._searchHistory.map(t => t); }
    
    public constructor(id: string, name: string, email: string,
        isConfirmedEmail: boolean, confirmationToken: string,
        passwordHash: string, searchHistory: Array<UserSearchTerm>)
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(name, "name")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(isConfirmedEmail, "isConfirmedEmail")
            .ensureHasValue()
            .ensureIsBoolean();
        
        given(confirmationToken, "confirmationToken")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(passwordHash, "passwordHash")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(searchHistory, "searchHistory")
            .ensureHasValue()
            .ensureIsArray();
        
        this._id = id;
        this._name = name;
        this._email = email;
        this._isConfirmedEmail = isConfirmedEmail;
        this._confirmationToken = confirmationToken;
        this._passwordHash = passwordHash;
        this._searchHistory = searchHistory;
    }
    
    public isPasswordValid(password: string, hashingService: HashingService): boolean
    {
        given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();
        
       return hashingService.compareHash(password, this._passwordHash);
    }
    
    public setNewPassword(password: string, hashingService: HashingService): void
    {
        given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();

        this._passwordHash = hashingService.generateHash(password);
    }
    
    public confirmEmail(): void
    {
        this._confirmationToken = "";
        this._isConfirmedEmail = true;
    }
    
    public AddToHistory(SearchTerm: SearchTerm, time: number): boolean
    {
        given(SearchTerm, "SearchTerm")
            .ensureHasValue()
            .ensureIsObject();
        given(time, "time")
            .ensureHasValue()
            .ensureIsNumber();
        
        let alreadySearched = this._searchHistory
            .find(t =>
                t.searchTerm.term.toLocaleLowerCase() === SearchTerm.term.toLocaleLowerCase());
        
        if (alreadySearched)
            return false;
        
        let id = uuid.v4();
        let newUserSearchTerm = new UserSearchTerm(id, SearchTerm, time);
        this._searchHistory.push(newUserSearchTerm);
        return true;
    }   
}