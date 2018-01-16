"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const search_term_1 = require("../../models/search-term");
const n_ject_1 = require("n-ject");
const n_defensive_1 = require("n-defensive");
const uiud = require("uuid");
const search_term_already_exisits_exception_1 = require("../../../exceptions/search-term-already-exisits-exception");
let DefaultSearchTermFactory = class DefaultSearchTermFactory {
    constructor(searchTermRepository) {
        n_defensive_1.given(searchTermRepository, "searchTermRepository")
            .ensureHasValue()
            .ensureIsObject();
        this._searchTermRepository = searchTermRepository;
    }
    create(term) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(term, "term")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            let normalizeTerm = term.trim().toLowerCase();
            let exisitingTerm = yield this._searchTermRepository.getByTerm(term);
            if (exisitingTerm)
                throw new search_term_already_exisits_exception_1.SearchTermAlreadyExistsException(term);
            let id = uiud.v4();
            let newTerm = new search_term_1.SearchTerm(id, normalizeTerm, 1);
            return newTerm;
        });
    }
};
DefaultSearchTermFactory = __decorate([
    n_ject_1.inject("SearchTermRepository"),
    __metadata("design:paramtypes", [Object])
], DefaultSearchTermFactory);
exports.DefaultSearchTermFactory = DefaultSearchTermFactory;
//# sourceMappingURL=default-search-term-factory.js.map