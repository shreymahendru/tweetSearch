import { DbConnectionService } from "./db-connection-service";
import { inject } from "n-ject";
import { ConfigService } from "../config-service/config-service";
import { given } from "n-defensive";
var mongoose = require("mongoose");

(<any>mongoose).Promise = global.Promise;

@inject("ConfigService")
export class MongoConnectionService implements DbConnectionService
{
    private readonly _configService: ConfigService;
    private _mongoConnection: boolean;

    public constructor(configService: ConfigService)
    {
        given(configService, "configService")
            .ensureHasValue();

        this._configService = configService;
        this._mongoConnection = false;
    }
    
    public connect(): void
    {
        let mongoUrl = this._configService.getDbUrl();
        if (this._mongoConnection)
            return;    
        
        mongoose.connect(mongoUrl, { useMongoClient: true });
        this._mongoConnection = true; 
        // return this._mongoConnection;
    }
    
}