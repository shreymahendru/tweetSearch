"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
class SearchTerm {
    get id() { return this._id; }
    get term() { return this._term; }
    get numberOfTimesSearched() { return this._numberOftimesSearched; }
    constructor(id, term, numberOfTimesSearched) {
        n_defensive_1.given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(term, "term")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(numberOfTimesSearched, "numberOfTimesSearched")
            .ensureHasValue()
            .ensureIsNumber();
        this._id = id;
        this._term = term;
        this._numberOftimesSearched = numberOfTimesSearched;
    }
    increaseCount() {
        this._numberOftimesSearched++;
    }
}
exports.SearchTerm = SearchTerm;
//# sourceMappingURL=search-term.js.map