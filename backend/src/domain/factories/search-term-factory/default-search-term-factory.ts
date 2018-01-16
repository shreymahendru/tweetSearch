import { SearchTermFactory } from "./search-term-factory";
import { SearchTerm } from "../../models/search-term";
import { SearchTermRepository } from "../../repositories/search-term-repository/search-term-repository";
import { inject } from "n-ject";
import { given } from "n-defensive";
import * as uiud from "uuid";
import { SearchTermAlreadyExistsException } from "../../../exceptions/search-term-already-exisits-exception";


@inject("SearchTermRepository")
export class DefaultSearchTermFactory implements SearchTermFactory
{
    private readonly _searchTermRepository: SearchTermRepository;
    
    public constructor(searchTermRepository: SearchTermRepository)
    {
        given(searchTermRepository, "searchTermRepository")
            .ensureHasValue()
            .ensureIsObject();
        
        this._searchTermRepository = searchTermRepository;
    }
    
    public async create(term: string): Promise<SearchTerm>
    {
        given(term, "term")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        let normalizeTerm = term.trim().toLowerCase();
        
        let exisitingTerm = await this._searchTermRepository.getByTerm(term);
        
        if (exisitingTerm)
            throw new SearchTermAlreadyExistsException(term);
        
        let id = uiud.v4();
        
        let newTerm = new SearchTerm(id, normalizeTerm, 1);
        return newTerm;
    }   
}