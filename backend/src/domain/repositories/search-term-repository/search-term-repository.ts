import { SearchTerm } from "../../models/search-term";

export interface SearchTermRepository
{
    get(id: string): Promise<SearchTerm>;
    getByTerm(term: string): Promise<SearchTerm>;
    getTopNSearched(n: number): Promise<Array<SearchTerm>>;   
}