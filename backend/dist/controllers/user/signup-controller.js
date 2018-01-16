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
const n_ject_1 = require("n-ject");
const Routes = require("../routes");
const n_defensive_1 = require("n-defensive");
const n_validate_1 = require("n-validate");
let SignupController = class SignupController extends n_web_1.Controller {
    constructor(userFactory, userRepository, mailerService, tokenService) {
        n_defensive_1.given(userFactory, "userFactory")
            .ensureHasValue();
        n_defensive_1.given(userRepository, "userRepository")
            .ensureHasValue();
        n_defensive_1.given(mailerService, "mailerService")
            .ensureHasValue();
        n_defensive_1.given(tokenService, "tokenService")
            .ensureHasValue();
        super();
        this._userFactory = userFactory;
        this._userRepository = userRepository;
        this._mailerService = mailerService;
        this._tokenService = tokenService;
    }
    execute(model) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateModel(model);
            let newUser = yield this._userFactory.create(model.email, model.name, model.password);
            yield this._userRepository.save(newUser);
            this._mailerService.sendEmailConfirmationEmail(newUser);
            let authToken = this._tokenService.generateAuthToken(newUser);
            return {
                id: newUser.id,
                token: authToken,
                name: newUser.name,
                email: newUser.email
            };
        });
    }
    validateModel(model) {
        let validator = new n_validate_1.Validator();
        validator.for("name")
            .isRequired()
            .useValidationRule(n_validate_1.strval.hasMaxLength(10));
        validator.for("email")
            .isRequired()
            .useValidationRule(n_validate_1.strval.hasMaxLength(100));
        validator.for("password")
            .isRequired()
            .useValidationRule(n_validate_1.strval.hasMaxLength(100));
        validator.validate(model);
        if (validator.hasErrors)
            throw new n_web_1.HttpException(400, validator.errors);
    }
};
SignupController = __decorate([
    n_web_1.httpPost,
    n_web_1.route(Routes.signupUser),
    n_ject_1.inject("UserFactory", "UserRepository", "MailerService", "TokenService"),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SignupController);
exports.SignupController = SignupController;
//# sourceMappingURL=signup-controller.js.map