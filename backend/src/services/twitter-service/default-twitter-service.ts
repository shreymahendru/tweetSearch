import { TwitterService, Tweet } from "./twitter-service";
import { ConfigService } from "../config-service/config-service";
import { given } from "n-defensive";
import * as Twitter from "twitter";
import { TweetRetrivalException } from "../../exceptions/tweet-retrival-exception";
import { inject } from "n-ject";

@inject("ConfigService")
export class DefaultTwitterService implements TwitterService
{
    private readonly _configService: ConfigService;
    private readonly _client: any;
    
    public constructor(configService: ConfigService)
    {
        given(configService, "configService")
            .ensureHasValue();
        
        this._configService = configService;
        this._client = new Twitter(this._configService.getTwitterConfig());   
    }
    
    public async getTweets(query: string): Promise<Tweet[]>
    {
        given(query, "query")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        
        let promise = new Promise<Tweet[]>((resolve, reject) =>
        {
            this._client.get("search/tweets", { "q": query }, (err, tweetsFound, response) =>
            {
                if (err)
                    throw new TweetRetrivalException();
                let alltweets: Array<any> = tweetsFound["statuses"];
                
                let tweets: Tweet[] = alltweets.map(t =>
                    ({
                        id: t["id_str"],
                        text: t["text"]
                    }));
                resolve(tweets);
            });
        });
        
        let tweets = await promise;
        return tweets;
    }
}