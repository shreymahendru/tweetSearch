import { DbConnectionService } from "./db-connection-service";
import { inject } from "n-ject";
import { ConfigService } from "../config-service/config-service";
import { given } from "n-defensive";
import * as mongoose from "mongoose";
import { MongooseThenable } from "mongoose";

(mongoose as any).Promise = global.Promise;

@inject("ConfigService")
export class MongoConnectionService implements DbConnectionService
{
    private readonly _configService: ConfigService;
    private _mongoConnection: MongooseThenable;

    public constructor(configService: ConfigService)
    {
        given(configService, "configService")
            .ensureHasValue();

        this._configService = configService;
        this._mongoConnection = null;
    }
    
    public connect(): MongooseThenable
    {
        let mongoUrl = this._configService.getDbUrl();
        if (this._mongoConnection)
            return this._mongoConnection;    
        
        this._mongoConnection = mongoose.connect(mongoUrl, { useMongoClient: true });
        return this._mongoConnection;
    }
    
}