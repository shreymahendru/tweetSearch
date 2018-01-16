import { Controller, route, httpGet, authorize, CallContext } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { TokenService } from "../../services/token-service/token-service";
import { TwitterService } from "../../services/twitter-service/twitter-service";
import { SearchTermRepository } from "../../domain/repositories/search-term-repository/search-term-repository";
import { SearchTermFactory } from "../../domain/factories/search-term-factory/search-term-factory";
import { authClaim } from "./../../security/app-claims";


@httpGet
@authorize(authClaim)    
@route(Routes.search)
@inject("UserRepository", "TwitterService",
     "SearchTermRepository", "SearchTermFactory", "CallContext", "TokenService")
export class SearchTweetController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _twitterService: TwitterService;
    private readonly _tokenService: TokenService;
    private readonly _searchTermRepository: SearchTermRepository;
    private readonly _searchTermFactory: SearchTermFactory;
    private readonly _callContext: CallContext;

    public constructor(userRepository: UserRepository,
        twitterService: TwitterService, searchTermRepository: SearchTermRepository,
        searchTermFactory: SearchTermFactory, callContext: CallContext,
        tokenService: TokenService)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(twitterService, "TwitterService")
            .ensureHasValue();
        given(searchTermRepository, "searchTermRepository")
            .ensureHasValue();
        given(searchTermFactory, "searchTermFactory")
            .ensureHasValue();
        given(callContext, "callContext")
            .ensureHasValue();
        given(tokenService, "tokenService")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
        this._twitterService = twitterService;
        this._searchTermRepository = searchTermRepository;
        this._searchTermFactory = searchTermFactory;
        this._callContext = callContext;
        this._tokenService = tokenService;
    }


    public async execute($search: string): Promise<any>
    {
        given($search, "$search")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        $search = $search.trim();
        
        let authToken = this._callContext.authToken;
        
        let { email,  } = this._tokenService
            .decodeToken<{ email: string; isConfirmedEmail: string; }>(authToken);
        
        // parallelising
        let userPromise = this._userRepository.getUserByEmail(email);
        let tweetsPromise = this._twitterService.getTweets($search);
        
        let user  = await userPromise;
        let tweets =await tweetsPromise;
        
        let existingSearchTerm = await this._searchTermRepository.getByTerm($search);
        if (existingSearchTerm)
        {
            existingSearchTerm.increaseCount();
            user.AddToHistory(existingSearchTerm);
            await this._userRepository.save(user);
        }
        else
        {
            let searchTerm = await this._searchTermFactory.create($search);
            await this._searchTermRepository.save(searchTerm);
            user.AddToHistory(existingSearchTerm);
            await this._userRepository.save(user);
        }
        
        let response = tweets.map(t =>
            ({
                id: t.id,
                text: t.text
            }));
        
        return response;
    }
}