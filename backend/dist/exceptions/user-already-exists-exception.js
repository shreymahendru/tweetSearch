"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
class UserAlreadyExistsException extends n_exception_1.ApplicationException {
    constructor(email) {
        super(`User with email ${email} already exists.`);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=user-already-exists-exception.js.map