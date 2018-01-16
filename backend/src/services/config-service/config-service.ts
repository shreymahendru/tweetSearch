import { EmailConfiguartion } from "../mailer-service/mailer-service";
import { TwitterConfig } from "../twitter-service/twitter-service";

export interface ConfigService
{
    getBaseUrl(): string;
    getEmailTokenTTL(): string;
    getAuthTokenTTL(): string;
    getJWTSecret(): string;
    getDbUrl(): string;
    getEmailConfiguration(): EmailConfiguartion;
    getTwitterConfig(): TwitterConfig;
}