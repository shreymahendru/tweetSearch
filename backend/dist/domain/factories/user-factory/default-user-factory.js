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
const n_defensive_1 = require("n-defensive");
const user_1 = require("../../models/user");
const uiud = require("uuid");
const user_already_exists_exception_1 = require("../../../exceptions/user-already-exists-exception");
const n_ject_1 = require("n-ject");
let DefaultUserFactory = class DefaultUserFactory {
    constructor(userRepository, tokenService, hashingService) {
        n_defensive_1.given(userRepository, "userRepository")
            .ensureHasValue()
            .ensureIsObject();
        n_defensive_1.given(tokenService, "tokenService")
            .ensureHasValue()
            .ensureIsObject();
        n_defensive_1.given(hashingService, "hashingService")
            .ensureHasValue()
            .ensureIsObject();
        this._userRepository = userRepository;
        this._hashingService = hashingService;
        this._tokenService = tokenService;
    }
    create(email, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(password, "password")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(username, "username")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            n_defensive_1.given(email, "email")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            let existingUser = yield this._userRepository.getUserByEmail(email);
            if (existingUser)
                throw new user_already_exists_exception_1.UserAlreadyExistsException(email);
            let passwordHash = this._hashingService.generateHash(password);
            let confirmationToken = this._tokenService.generateEmailConfirmationToken(email);
            let id = uiud.v4();
            let newUser = new user_1.User(id, username, email, false, confirmationToken, passwordHash, []);
            return newUser;
        });
    }
};
DefaultUserFactory = __decorate([
    n_ject_1.inject("UserRepository", "TokenService", "HashingService"),
    __metadata("design:paramtypes", [Object, Object, Object])
], DefaultUserFactory);
exports.DefaultUserFactory = DefaultUserFactory;
//# sourceMappingURL=default-user-factory.js.map