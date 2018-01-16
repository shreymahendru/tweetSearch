import { EmailConfiguartion } from "../mailer-service/mailer-service";

export interface ConfigService
{
    getBaseUrl(): string;
    getEmailTokenTTL(): string;
    getAuthTokenTTL(): string;
    getJWTSecret(): string;
    getDbUrl(): string;
    getEmailConfiguration(): EmailConfiguartion;
}