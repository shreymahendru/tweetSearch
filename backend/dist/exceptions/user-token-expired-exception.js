"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
class UserTokenExpiredException extends n_exception_1.ApplicationException {
    constructor() {
        super(`Token Expired`);
    }
}
exports.UserTokenExpiredException = UserTokenExpiredException;
//# sourceMappingURL=user-token-expired-exception.js.map