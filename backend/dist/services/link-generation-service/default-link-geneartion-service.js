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
const n_ject_1 = require("n-ject");
const Routes = require("./../../controllers/routes");
let DefaultLinkGenerationService = class DefaultLinkGenerationService {
    constructor(configService, tokenService) {
        n_defensive_1.given(configService, "configService")
            .ensureHasValue();
        n_defensive_1.given(tokenService, "tokenService")
            .ensureHasValue();
        this._configService = configService;
        this._tokenService = tokenService;
    }
    generateResetPasswordLink(user) {
        n_defensive_1.given(user, "user")
            .ensureHasValue();
        let baseUrl = this._configService.getBaseUrl();
        baseUrl = baseUrl[baseUrl.length - 1] === "/" ? baseUrl : baseUrl + "/";
        let token = this._tokenService.generateResetPasswordToken(user.id);
        let route = Routes.resetPassword.substring(0, Routes.resetPassword.lastIndexOf("/"));
        let url = `${baseUrl}/${route}/${token}`;
        return url;
    }
    generateEmailConfirmationLink(user) {
        n_defensive_1.given(user, "user")
            .ensureHasValue();
        let baseUrl = this._configService.getBaseUrl();
        baseUrl = baseUrl[baseUrl.length - 1] === "/" ? baseUrl : baseUrl + "/";
        let route = Routes.confirmEmail.substring(0, Routes.confirmEmail.lastIndexOf("/"));
        let url = `${baseUrl}/${route}/${user.confirmationToken}`;
        return url;
    }
};
DefaultLinkGenerationService = __decorate([
    n_ject_1.inject("ConfigService", "TokenService"),
    __metadata("design:paramtypes", [Object, Object])
], DefaultLinkGenerationService);
exports.DefaultLinkGenerationService = DefaultLinkGenerationService;
//# sourceMappingURL=default-link-geneartion-service.js.map