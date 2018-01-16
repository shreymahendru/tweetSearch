"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
class UserSearchTerm {
    get id() { return this._id; }
    get searchTerm() { return this._searchterm; }
    get timeOfSearch() { return this._timeOfSearch; }
    constructor(id, searchterm, timeOfSearch) {
        n_defensive_1.given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(searchterm, "searchterm")
            .ensureHasValue()
            .ensureIsObject();
        n_defensive_1.given(timeOfSearch, "timeOfSearch")
            .ensureHasValue()
            .ensureIsNumber();
        this._id = id;
        this._searchterm = searchterm;
        this._timeOfSearch = timeOfSearch;
    }
}
exports.UserSearchTerm = UserSearchTerm;
//# sourceMappingURL=user-search-term.js.map