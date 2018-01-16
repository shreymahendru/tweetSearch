import { ConfigService } from "./config-service";
import { ConfigurationManager } from "n-config";
import { EmailConfiguartion } from "../mailer-service/mailer-service";
import { TwitterConfig } from "../twitter-service/twitter-service";

export class DefaultConfigService implements ConfigService
{   
    public getEmailConfiguration(): EmailConfiguartion
    {
        let host = ConfigurationManager.getConfig<string>("emailHost");
        let port = ConfigurationManager.getConfig<number>("emailPort");
        let emailUser = ConfigurationManager.getConfig<string>("emailUser");
        let emailPassword = ConfigurationManager.getConfig<string>("emailPassword");
        let fromEmail = ConfigurationManager.getConfig<string>("fromEmail");
        return {
            host: host,
            port: port,
            auth: {
                user: emailUser,
                pass: emailPassword
            }, 
            email: fromEmail
        };
    }
    public getEmailTokenTTL(): string
    {
        let value = ConfigurationManager.getConfig<string>("emailTokenTTL");
        return value;
    }
    
    public getAuthTokenTTL(): string
    {
        let value = ConfigurationManager.getConfig<string>("authTokenTTL");
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
    
    public getDbUrl(): string
    {
        let value = ConfigurationManager.getConfig<string>("dbUrl");
        return value;
    }
    
    public getTwitterConfig(): TwitterConfig
    {
        let value = ConfigurationManager.getConfig<TwitterConfig>("twitterConfig")
        return value;
    }
}