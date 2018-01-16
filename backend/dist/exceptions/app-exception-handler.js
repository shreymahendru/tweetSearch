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
const n_web_1 = require("n-web");
const user_not_found_exception_1 = require("./user-not-found-exception");
const n_web_2 = require("n-web");
const n_ject_1 = require("n-ject");
const n_defensive_1 = require("n-defensive");
const user_already_exists_exception_1 = require("./user-already-exists-exception");
const search_term_already_exisits_exception_1 = require("./search-term-already-exisits-exception");
const user_token_expired_exception_1 = require("./user-token-expired-exception");
const user_invalid_token_exception_1 = require("./user-invalid-token-exception");
let AppExceptionHandler = class AppExceptionHandler extends n_web_1.ExceptionHandler {
    constructor(logger) {
        n_defensive_1.given(logger, "logger").ensureHasValue();
        super();
        this._logger = logger;
    }
    handle(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logError(exp);
            if (exp instanceof user_not_found_exception_1.UserNotFoundException) {
                yield this.handleUserNotFoundException(exp);
            }
            else if (exp instanceof user_already_exists_exception_1.UserAlreadyExistsException) {
                yield this.handleUserAlreadyExistsException(exp);
            }
            else if (exp instanceof search_term_already_exisits_exception_1.SearchTermAlreadyExistsException) {
                yield this.handleSearchTermAlreadyExistsException(exp);
            }
            else if (exp instanceof user_token_expired_exception_1.UserTokenExpiredException) {
                yield this.handleUserTokenExpiredException(exp);
            }
            else if (exp instanceof user_invalid_token_exception_1.UserInvalidTokenException) {
                yield this.handleUserInvalidTokenExceptionn(exp);
            }
            else {
                throw new n_web_2.HttpException(500, "We encountered a problem while processing your request");
            }
        });
    }
    handleUserNotFoundException(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logError(exp);
            throw new n_web_2.HttpException(404, exp.message);
        });
    }
    handleUserAlreadyExistsException(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logError(exp);
            throw new n_web_2.HttpException(409, exp.message);
        });
    }
    handleSearchTermAlreadyExistsException(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logError(exp);
            throw new n_web_2.HttpException(500, "We encountered a problem while processing your request");
        });
    }
    handleUserTokenExpiredException(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logInfo("Token Expired");
            throw new n_web_2.HttpException(401, "Token has expired");
        });
    }
    handleUserInvalidTokenExceptionn(exp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._logger.logInfo("Invalid Token");
            throw new n_web_2.HttpException(401, "Token is Invalid");
        });
    }
};
AppExceptionHandler = __decorate([
    n_ject_1.inject("Logger"),
    __metadata("design:paramtypes", [Object])
], AppExceptionHandler);
exports.AppExceptionHandler = AppExceptionHandler;
//# sourceMappingURL=app-exception-handler.js.map