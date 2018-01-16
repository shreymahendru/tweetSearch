export interface HashingService
{
    generateHash(strToBeEncrypted: string): string;
    compareHash(original: string, encrypted: string): boolean;
}