import { SearchTerm } from "../../models/search-term";

export interface SearchTermFactory
{
    create(term: string): Promise<SearchTerm>
}