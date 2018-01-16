"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
class UserNotFoundException extends n_exception_1.ApplicationException {
    constructor(id) {
        super(`User with id ${id} not found`);
    }
}
exports.UserNotFoundException = UserNotFoundException;
//# sourceMappingURL=user-not-found-exception.js.map