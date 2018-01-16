import { Controller, route, httpGet } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
// import { TokenService } from "../../services/token-service/token-service";
import { TwitterService } from "../../services/twitter-service/twitter-service";
import { SearchTermRepository } from "../../domain/repositories/search-term-repository/search-term-repository";
import { SearchTermFactory } from "../../domain/factories/search-term-factory/search-term-factory";


@httpGet
@route(Routes.search)
 @inject("UserRepository", "TwitterService",
     "SearchTermRepository", "SearchTermFactory")
export class SearchTweetController extends Controller
{
    private readonly _userRepository: UserRepository;
    private readonly _twitterService: TwitterService;
    private readonly _searchTermRepository: SearchTermRepository;
    private readonly _searchTermFactory: SearchTermFactory;

    public constructor(userRepository: UserRepository,
        twitterService: TwitterService,
        searchTermRepository: SearchTermRepository, searchTermFactory: SearchTermFactory)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();
        given(twitterService, "TwitterService")
            .ensureHasValue();
        given(searchTermRepository, "searchTermRepository")
            .ensureHasValue();
        given(searchTermFactory, "searchTermFactory")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
        this._twitterService = twitterService;
        this._searchTermRepository = searchTermRepository;
        this._searchTermFactory = searchTermFactory;
    }


    public async execute($search: string): Promise<any>
    {
        given($search, "$search")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        $search = $search.trim();
        
        let tweets = await this._twitterService.getTweets($search);
        
        let existingSearchTerm = await this._searchTermRepository.getByTerm($search);
        if (existingSearchTerm)
        {
            existingSearchTerm.increaseCount();
            // add to history here
        }
        else
        {
            let searchTerm = await this._searchTermFactory.create($search);
            await this._searchTermRepository.save(searchTerm);
        }

        // let user = await this._userRepository.get(id);

        // user.setNewPassword(model.newPassword, this._hashingService);
        let response = tweets.map(t =>
            ({
                id: t.id,
                text: t.text
            }));
        return response;
    }
}