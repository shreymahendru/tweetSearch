"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_exception_1 = require("n-exception");
require("n-ext");
class SearchTermAlreadyExistsException extends n_exception_1.ApplicationException {
    constructor(term) {
        super(`Term: ${term} with already exists.`);
    }
}
exports.SearchTermAlreadyExistsException = SearchTermAlreadyExistsException;
//# sourceMappingURL=search-term-already-exisits-exception.js.map