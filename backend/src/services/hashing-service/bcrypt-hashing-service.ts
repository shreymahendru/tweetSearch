import { HashingService } from "./hashing-service";
import { hashSync, compareSync } from "bcrypt";
import { given } from "n-defensive";

export class BcryptHashingService implements HashingService
{
    private readonly SALT: number = 10; 
    
    public generateHash(strToBeEncrypted: string): string
    {
        given(strToBeEncrypted, "strToBeEncrypted")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        return hashSync(strToBeEncrypted, this.SALT);
    }
    
    public compareHash(original: string, encrypted: string): boolean
    {
        given(original, "original")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        given(encrypted, "encrypted")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        
        return compareSync(original, encrypted);
    }
    
}