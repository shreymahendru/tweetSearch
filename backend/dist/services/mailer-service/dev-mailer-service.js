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
const nodemailer = require("nodemailer");
const n_ject_1 = require("n-ject");
const n_defensive_1 = require("n-defensive");
let DevMailerService = class DevMailerService {
    constructor(configService, linkGenerationService) {
        n_defensive_1.given(configService, "configService")
            .ensureHasValue();
        n_defensive_1.given(linkGenerationService, "linkGenerationService")
            .ensureHasValue();
        this._configService = configService;
        this._linkGenerationService = linkGenerationService;
        this._emailConfig = this._configService.getEmailConfiguration();
        this._transport = nodemailer.createTransport({
            host: this._emailConfig.host,
            port: this._emailConfig.port,
            secure: false,
            auth: {
                user: this._emailConfig.auth.user,
                pass: this._emailConfig.auth.pass
            }
        });
    }
    sendEmailConfirmationEmail(user) {
        n_defensive_1.given(user, "user")
            .ensureHasValue();
        const email = {
            from: this._emailConfig.email,
            to: user.email,
            text: `
            Welcome to tweetSearch. Please confirm your email
            
            ${this._linkGenerationService.generateEmailConfirmationLink(user)}
        `
        };
        this._transport.sendMail(email);
    }
    sendResetPasswordEmail(user) {
        n_defensive_1.given(user, "user")
            .ensureHasValue();
        const email = {
            from: this._emailConfig.email,
            to: user.email,
            text: `
            To Reset password click on the link below.
            
            ${this._linkGenerationService.generateResetPasswordLink(user)}
        `
        };
        this._transport.sendMail(email);
    }
};
DevMailerService = __decorate([
    n_ject_1.inject("ConfigService", "LinkGenerationService"),
    __metadata("design:paramtypes", [Object, Object])
], DevMailerService);
exports.DevMailerService = DevMailerService;
//# sourceMappingURL=dev-mailer-service.js.map