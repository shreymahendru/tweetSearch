import { Controller, route, httpGet, authorize } from "n-web";
import { inject } from "n-ject";
import * as Routes from "../routes";
import { given } from "n-defensive";
import { SearchTermRepository } from "../../domain/repositories/search-term-repository/search-term-repository";
import { authClaim } from "./../../security/app-claims";


@httpGet
@authorize(authClaim)
@route(Routes.nMostSearched)
@inject("SearchTermRepository")
export class NMostSearchedController extends Controller
{
    private readonly _searchTermRepository: SearchTermRepository;

    public constructor(searchTermRepository: SearchTermRepository)
    {
        given(searchTermRepository, "searchTermRepository")
            .ensureHasValue();
        
        super();
        
        this._searchTermRepository = searchTermRepository;
    }

    public async execute($count: number): Promise<any>
    {
        given($count, "$count")
            .ensureHasValue()
            .ensureIsNumber()
            .ensure(t => t > 0);

        let mostSearched = await this._searchTermRepository.getTopNSearched($count);
    
        let response = mostSearched.map(t =>
            ({
                timesSearched: t.numberOfTimesSearched,
                term: t.term
            }));

        return response;
    }
}