"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const n_defensive_1 = require("n-defensive");
class BcryptHashingService {
    constructor() {
        this.SALT = 10;
    }
    generateHash(strToBeEncrypted) {
        n_defensive_1.given(strToBeEncrypted, "strToBeEncrypted")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        return bcrypt_1.hashSync(strToBeEncrypted, this.SALT);
    }
    compareHash(original, encrypted) {
        n_defensive_1.given(original, "original")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(encrypted, "encrypted")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        return bcrypt_1.compareSync(original, encrypted);
    }
}
exports.BcryptHashingService = BcryptHashingService;
//# sourceMappingURL=bcrypt-hashing-service.js.map