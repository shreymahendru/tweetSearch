"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
class UserInvalidTokenException extends n_exception_1.ApplicationException {
    constructor() {
        super(`Invalid Token`);
    }
}
exports.UserInvalidTokenException = UserInvalidTokenException;
//# sourceMappingURL=user-invalid-token-exception.js.map