export interface ConfigService
{
    getBaseUrl(): string;
    getTokenTTL(): string;
    getJWTSecret(): string;
}