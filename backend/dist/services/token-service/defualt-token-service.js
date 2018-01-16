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
Object.defineProperty(exports, "__esModule", { value: true });
const n_defensive_1 = require("n-defensive");
const jsonwebtoken_1 = require("jsonwebtoken");
const n_ject_1 = require("n-ject");
const user_token_expired_exception_1 = require("../../exceptions/user-token-expired-exception");
const user_invalid_token_exception_1 = require("../../exceptions/user-invalid-token-exception");
const n_exception_1 = require("n-exception");
let DefaultTokenService = class DefaultTokenService {
    constructor(configService) {
        n_defensive_1.given(configService, "configService")
            .ensureHasValue()
            .ensureIsObject();
        this._configService = configService;
    }
    generateEmailConfirmationToken(email) {
        n_defensive_1.given(email, "email")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        let secret = this._configService.getJWTSecret();
        let obj = {
            email
        };
        let token = jsonwebtoken_1.sign(obj, secret);
        return token;
    }
    generateResetPasswordToken(id) {
        n_defensive_1.given(id, "id")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        let secret = this._configService.getJWTSecret();
        let ttl = this._configService.getEmailTokenTTL();
        let obj = {
            id
        };
        let token = jsonwebtoken_1.sign(obj, secret, { expiresIn: ttl });
        return token;
    }
    verifyToken(token) {
        n_defensive_1.given(token, "token")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        let secret = this._configService.getJWTSecret();
        try {
            jsonwebtoken_1.verify(token, secret);
        }
        catch (err) {
            return false;
        }
        return true;
    }
    decodeToken(token) {
        n_defensive_1.given(token, "token")
            .ensureHasValue()
            .ensureIsString()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        let secret = this._configService.getJWTSecret();
        try {
            let decoded = jsonwebtoken_1.verify(token, secret);
            return decoded;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError)
                throw new user_token_expired_exception_1.UserTokenExpiredException();
            if (err instanceof jsonwebtoken_1.JsonWebTokenError)
                throw new user_invalid_token_exception_1.UserInvalidTokenException();
            else
                throw new n_exception_1.ApplicationException(err);
        }
    }
    generateAuthToken(user) {
        n_defensive_1.given(user, "user")
            .ensureHasValue();
        let authTokenTTL = this._configService.getAuthTokenTTL();
        let secret = this._configService.getJWTSecret();
        let obj = {
            email: user.email,
            isConfirmedEmail: user.isConfirmedEmail
        };
        let token = jsonwebtoken_1.sign(obj, secret, {
            expiresIn: authTokenTTL
        });
        return token;
    }
};
DefaultTokenService = __decorate([
    n_ject_1.inject("ConfigService"),
    __metadata("design:paramtypes", [Object])
], DefaultTokenService);
exports.DefaultTokenService = DefaultTokenService;
//# sourceMappingURL=defualt-token-service.js.map