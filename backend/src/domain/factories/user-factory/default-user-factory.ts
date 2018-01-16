import { UserFactory } from "./user-factory";
import { UserRepository } from "../../repositories/user-repository/user-repository";
import { given } from "n-defensive";
import { User } from "../../models/user";
import * as uiud from "uuid";
import { TokenService } from "../../../services/token-service/token-service";
import { HashingService } from "../../../services/hashing-service/hashing-service";
import { UserAlreadyExistsException } from "../../../exceptions/user-already-exists-exception";
import { inject } from "n-ject";


@inject("UserRepository", "TokenService", "HashingService")
export class DefaultUserFactory implements UserFactory
{
    private readonly _userRepository: UserRepository;
    private readonly _tokenService: TokenService;
    private readonly _hashingService: HashingService;
    
    public constructor(userRepository: UserRepository, tokenService: TokenService,
        hashingService: HashingService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue()
            .ensureIsObject();
        given(tokenService, "tokenService")
            .ensureHasValue()
            .ensureIsObject();
        given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();
        
        this._userRepository = userRepository;
        this._hashingService = hashingService;
        this._tokenService = tokenService;
    }
    
    public async create(email: string, username: string, password: string): Promise<User>
    {
        given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(username, "username")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        let existingUser = await this._userRepository.getUserByEmail(email);  
        
        if (existingUser)
            throw new UserAlreadyExistsException(email);
        
        let passwordHash = this._hashingService.generateHash(password);
        let confirmationToken = this._tokenService.generateEmailConfirmationToken(email);
        let id = uiud.v4();
        
        let newUser = new User(id, username, email, false, confirmationToken, passwordHash, []);
        return newUser;
    }
}