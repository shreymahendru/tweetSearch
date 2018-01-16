import { SearchTermRepository } from "./search-term-repository";
import * as mongoose from "mongoose";
import { SearchTerm } from "../../models/search-term";
import { DbConnectionService } from "../../../services/db-connection-service/db-connection-service";
import { given } from "n-defensive";
import { inject } from "n-ject";

interface SearchTermModel
{
    id: string;
    term: string;
    numberOfTimes: number;
    // doing this to work with mongoose. typescript is not working properly with it
    save: () => Promise<void>;
    remove: () => Promise<void>;
}

@inject("DbConnectionService")
export class MongoSearchTermRepository implements SearchTermRepository
{
    private readonly _dbConnectionService: DbConnectionService;
    private _searchTermModel: mongoose.Model;

    public constructor(dbConnectionService: DbConnectionService)
    {
        given(dbConnectionService, "dbConnectionService")
            .ensureHasValue();

        this._dbConnectionService = dbConnectionService;

        this.setUpModel();
    }
    
    private setUpModel()
    {
        this._dbConnectionService.connect();

        const searchTermSchema = new mongoose.Schema({
            id: { type: String, required: true, unique: true },
            term: { type: String, required: true, lowercase: true, unique: true },
            numberOfTimes: { type: Number, required: true }
        });

        this._searchTermModel = mongoose.model("SearchTerm", searchTermSchema);
    }

    public async get(id: string): Promise<SearchTerm>
    {
        given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());

        let searchTermModel: SearchTermModel  = await this._searchTermModel.findOne({ id: id })
        if (!searchTermModel)
            return null;

        return new SearchTerm(searchTermModel.id, searchTermModel.term, searchTermModel.numberOfTimes);  
    }
    
    public async getByTerm(term: string): Promise<SearchTerm>
    {
        given(term, "term")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        term = term.toLowerCase();
        let searchTermModel: SearchTermModel = await this._searchTermModel.findOne({ term: term })
        if (!searchTermModel)
            return null;

        return new SearchTerm(searchTermModel.id, searchTermModel.term, searchTermModel.numberOfTimes);
    }
    public async getTopNSearched(n: number): Promise<SearchTerm[]>
    {
        given(n, "n")
            .ensureHasValue()
            .ensureIsNumber()
            .ensure(t => t > 0);
        
        let searchTermModels: SearchTermModel[] = await this._searchTermModel.find({})
            .sort({
                numberOfTimes: -1
            }).limit(n);
        
        return searchTermModels.map(t => new SearchTerm(t.id, t.term, t.numberOfTimes));
    }
    
    public async save(searchTerm: SearchTerm): Promise<void>
    {
        given(searchTerm, "searchTerm")
            .ensureHasValue();
        
        let existingTerm = await this.get(searchTerm.id);
        
        if (existingTerm)
        {
            let model: SearchTermModel = await this._searchTermModel.findOne({ id: searchTerm.id });
            model.numberOfTimes = searchTerm.numberOfTimesSearched;
            await model.save();
        }    
        else
        {
            await this._searchTermModel.create({
                id: searchTerm.id,
                term: searchTerm.term.toLowerCase(),
                numberOfTimes: searchTerm.numberOfTimesSearched
            });
        }
    }  
}