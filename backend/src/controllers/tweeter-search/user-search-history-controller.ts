import { Controller, route, httpGet, authorize } from "n-web";
import { UserRepository } from "../../domain/repositories/user-repository/user-repository";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { authClaim } from "./../../security/app-claims";


@httpGet
@authorize(authClaim)
@route(Routes.userSearchHistory)
@inject("UserRepository")
export class UserSearchHistoryController extends Controller
{
    private readonly _userRepository: UserRepository;

    public constructor(userRepository: UserRepository)
    {
        given(userRepository, "userRepository")
            .ensureHasValue();

        super();
        this._userRepository = userRepository;
    }


    public async execute($user_id: string): Promise<any>
    {
        given($user_id, "$user_id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        // parallelising
        let user = await this._userRepository.get($user_id);
        
        let response = user.searchHistory.map(t => ({
            id: t.id,
            searchTerm: {
                id: t.searchTerm.id,
                numberOfTimesSearched: t.searchTerm.numberOfTimesSearched,
                term: t.searchTerm.term
            },
            time: t.timeOfSearch
        }))
        
        return response;
    }
}