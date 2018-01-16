import { ConfigService } from "./config-service";
import { ConfigurationManager } from "n-config";

export class DefaultConfigService implements ConfigService
{   
    public getTokenTTL(): string
    {
        let value = ConfigurationManager.getConfig<string>("tokenTTL");
        return value;
    }
    public getJWTSecret(): string
    {
        let value = ConfigurationManager.getConfig<string>("JWTSecret");
        return value;
    }
    public getBaseUrl(): string
    {
        let value = ConfigurationManager.getConfig<string>("baseUrl");
        return value;
    }
}