"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
const user_search_term_1 = require("./value-objects/user-search-term");
const uuid = require("uuid");
class User {
    get id() { return this._id; }
    get email() { return this._email; }
    get name() { return this._name; }
    get passwordHash() { return this._passwordHash; }
    get isConfirmedEmail() { return this._isConfirmedEmail; }
    get confirmationToken() { return this._confirmationToken; }
    get searchHistory() { return this._searchHistory.map(t => t); }
    constructor(id, name, email, isConfirmedEmail, confirmationToken, passwordHash, searchHistory) {
        n_defensive_1.given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(name, "name")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(isConfirmedEmail, "isConfirmedEmail")
            .ensureHasValue()
            .ensureIsBoolean();
        n_defensive_1.given(confirmationToken, "confirmationToken")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(passwordHash, "passwordHash")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(searchHistory, "searchHistory")
            .ensureHasValue()
            .ensureIsArray();
        this._id = id;
        this._name = name;
        this._email = email;
        this._isConfirmedEmail = isConfirmedEmail;
        this._confirmationToken = confirmationToken;
        this._passwordHash = passwordHash;
        this._searchHistory = searchHistory;
    }
    isPasswordValid(password, hashingService) {
        n_defensive_1.given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();
        return hashingService.compareHash(password, this._passwordHash);
    }
    setNewPassword(password, hashingService) {
        n_defensive_1.given(password, "password")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        n_defensive_1.given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();
        this._passwordHash = hashingService.generateHash(password);
    }
    confirmEmail() {
        this._confirmationToken = "";
        this._isConfirmedEmail = true;
    }
    AddToHistory(SearchTerm, time) {
        n_defensive_1.given(SearchTerm, "SearchTerm")
            .ensureHasValue()
            .ensureIsObject();
        n_defensive_1.given(time, "time")
            .ensureHasValue()
            .ensureIsNumber();
        let alreadySearched = this._searchHistory
            .find(t => t.searchTerm.term.toLocaleLowerCase() === SearchTerm.term.toLocaleLowerCase());
        if (alreadySearched)
            return false;
        let id = uuid.v4();
        let newUserSearchTerm = new user_search_term_1.UserSearchTerm(id, SearchTerm, time);
        this._searchHistory.push(newUserSearchTerm);
        return true;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map