import { SearchTermRepository } from "./search-term-repository";
import { SearchTerm } from "../../models/search-term";

export class MongoSearchTermRepository implements SearchTermRepository
{
    get(id: string): Promise<SearchTerm>
    {
        throw new Error("Method not implemented.");
    }
    getByTerm(term: string): Promise<SearchTerm>
    {
        throw new Error("Method not implemented.");
    }
    getTopNSearched(n: number): Promise<SearchTerm[]>
    {
        throw new Error("Method not implemented.");
    }
    
}