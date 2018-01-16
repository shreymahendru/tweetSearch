import { UserRepository } from "./user-repository";
import { inject } from "n-ject/dist/inject";
import { DbConnectionService } from "../../../services/db-connection-service/db-connection-service";
import { given } from "n-defensive";
import { MongooseThenable, Schema, Model, Document } from "mongoose";
import { User } from "../../models/user";

interface UserModel extends Document
{
    email: string,
    passwordHash: string,
    username: string,
    confirmed: boolean,
    confirmationToken: string
}


@inject("DbConnectionService")
export class MongoUserRepository implements UserRepository
{
    private readonly _dbConnectionService: DbConnectionService;
    private _mongooseInstance: MongooseThenable;
    private _userModel: Model<UserModel>;

    public constructor(dbConnectionService: DbConnectionService)
    {
        given(dbConnectionService, "dbConnectionService")
            .ensureHasValue();
        this._dbConnectionService = dbConnectionService;
        
        this.setUpModel();
    }
    
    private setUpModel()
    {
        this._mongooseInstance = this._dbConnectionService.connect() as MongooseThenable;
        
        const userSchema = new Schema({
            id: { type: String, required: true, unique: true },
            email: { type: String, required: true, lowercase: true, unique: true },
            passwordHash: {
                type: String, required: true
            },
            username: { type: String, required: true, lowercase: true, unique: true },
            confirmed: {
                type: Boolean, required: true, default: false
            },
            confirmationToken: {
                type: String, required: false
            }
        });
        
        this._userModel = this._mongooseInstance.model("user", userSchema);
    }
    
    public async save(user: User): Promise<void>
    {
        given(user, "user")
            .ensureHasValue();
        
        let existingUser = await this.get(user.id);
        if (existingUser)
        {
            let model = await this._userModel.findOne({ id: user.id })
            model.email = user.email;
            model.passwordHash = user.passwordHash;
            model.username = user.name;
            model.confirmed = user.isConfirmedEmail;
            model.confirmationToken = user.confirmationToken;
            await model.save();
        }
        else
        {
            await this._userModel.create({
                id: user.id,
                email: user.email,
                passwordHash: user.passwordHash,
                username: user.name,
                confirmed: user.isConfirmedEmail,
                confirmationToken: user.confirmationToken
            });
        }
    }
    
    public async getAll(): Promise<User[]>
    {
        throw new Error("Method not implemented.");
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
        
        return this.modelToUser(userModel);
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
       
        return this.modelToUser(userModel);
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
    
    private modelToUser(userModel: UserModel): User
    {
        let user = new User(userModel.id, userModel.username, userModel.email,
            userModel.confirmed, userModel.confirmationToken, userModel.passwordHash, [])
        return user;
    }
    
}