import { UserRepository } from "./user-repository";
import { inject } from "n-ject/dist/inject";
import { DbConnectionService } from "../../../services/db-connection-service/db-connection-service";
import { given } from "n-defensive";
import * as mongoose from "mongoose";
import { User } from "../../models/user";
import { SearchTermRepository } from "../search-term-repository/search-term-repository";
import { UserSearchTerm } from "../../models/value-objects/user-search-term";


interface UserModel
{
    id: string;
    email: string;
    passwordHash: string;
    username: string;
    confirmed: boolean;
    confirmationToken: string;
    userSearchTerm: Array<{
        id: string;
        searchTermId: string;
        time: number;
    }>
    // doing this to work with mongoose. typescript is not working properly with it
    save: () => Promise<void>;
    remove: () => Promise<void>;
}


@inject("DbConnectionService", "SearchTermRepository")
export class MongoUserRepository implements UserRepository
{
    private readonly _dbConnectionService: DbConnectionService;
    private readonly _searchTermRepository: SearchTermRepository;
    private _userModel: mongoose.Model;

    public constructor(dbConnectionService: DbConnectionService,
        searchTermRepository: SearchTermRepository)
    {
        given(dbConnectionService, "dbConnectionService")
            .ensureHasValue();
        given(searchTermRepository, "searchTermRepository")
            .ensureHasValue();
        
        this._dbConnectionService = dbConnectionService;
        this._searchTermRepository = searchTermRepository;
        
        this.setUpModel();
    }
    
    private setUpModel()
    {
        this._dbConnectionService.connect();
        
        const userSchema = new mongoose.Schema({
            id: { type: String, required: true, unique: true },
            email: { type: String, required: true, lowercase: true },
            passwordHash: {
                type: String, required: true
            },
            username: { type: String, required: true, lowercase: true },
            confirmed: {
                type: Boolean, required: true, default: false
            },
            confirmationToken: {
                type: String, required: false
            }, 
            userSearchTerm: [{
                id: { type: String, required: true},
                searchTermId: {
                    type: String,
                    required: true
                }, 
                time: {type: Number, required: true}
            }]
        });
        
        this._userModel = mongoose.model("User", userSchema);
    }
    
    public async save(user: User): Promise<void>
    {
        given(user, "user")
            .ensureHasValue();
        
        let existingUser = await this.get(user.id);
        if (existingUser)
        {
            let model: UserModel = await this._userModel.findOne({ id: user.id })
            model.email = user.email.toLowerCase();
            model.passwordHash = user.passwordHash;
            model.username = user.name;
            model.confirmed = user.isConfirmedEmail;
            model.confirmationToken = user.confirmationToken;
            model.userSearchTerm = user.searchHistory.map(t => ({
                id: t.id,
                searchTermId: t.searchTerm.id,
                time: t.timeOfSearch 
            }));
            
            await model.save();
        }
        else
        {
            await this._userModel.create({
                id: user.id,
                email: user.email.toLowerCase(),
                passwordHash: user.passwordHash,
                username: user.name,
                confirmed: user.isConfirmedEmail,
                confirmationToken: user.confirmationToken,
                userSearchTerm: user.searchHistory.map(t => ({
                    id: t.id,
                    searchTermId: t.searchTerm.id,
                    time: t.timeOfSearch
                }))
            });
        }
    }
    
    public async getAll(): Promise<User[]>
    {
        let userModels: UserModel[] = await this._userModel.find({})
        let users = await userModels.mapAsync(async t => await this.deserialize(t));
        return users;
    }
    
    public async get(id: string): Promise<User>
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let userModel = await this._userModel.findOne({ id: id })
        if (!userModel)
            return null;
        
        return await this.deserialize(userModel);
    }
    
    public async getUserByEmail(email: string): Promise<User>
    {
        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        email = email.toLowerCase();
        let userModel = await this._userModel.findOne({ email: email });
        if (!userModel)
            return null;
       
        return await this.deserialize(userModel);
    }
    
    public async delete(id: string): Promise<void>
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let userModel = await this._userModel.findOne({ id: id });
        
        if (userModel)
            await userModel.remove();
    }
    
    private async deserialize(userModel: UserModel): Promise<User>
    {
        let searchTerms: UserSearchTerm[] = await userModel.userSearchTerm.mapAsync(async t =>
        {
            let searchTerm = await this._searchTermRepository.get(t.searchTermId);
            return new UserSearchTerm(t.id, searchTerm, t.time);
        });
        
        let sortedSearchTerms = searchTerms.sort((a, b) => b.timeOfSearch - a.timeOfSearch);
        
        let user = new User(userModel.id, userModel.username, userModel.email,
            userModel.confirmed, userModel.confirmationToken, userModel.passwordHash, sortedSearchTerms)
        return user;
    }
}