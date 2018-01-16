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
const inject_1 = require("n-ject/dist/inject");
const n_defensive_1 = require("n-defensive");
// import { MongooseThenable, Schema, Model, Document } from "mongoose";
// var mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const user_1 = require("../../models/user");
// type UserModel = mongoose.Document &
// {
//     email: string,
//     passwordHash: string,
//     username: string,
//     confirmed: boolean,
//     confirmationToken: string
// }
let MongoUserRepository = class MongoUserRepository {
    constructor(dbConnectionService) {
        n_defensive_1.given(dbConnectionService, "dbConnectionService")
            .ensureHasValue();
        this._dbConnectionService = dbConnectionService;
        this.setUpModel();
    }
    setUpModel() {
        this._dbConnectionService.connect();
        const userSchema = new mongoose_1.default.Schema({
            id: { type: String, required: true, unique: true },
            email: { type: String, required: true, lowercase: true, unique: true },
            passwordHash: {
                type: String, required: true
            },
            username: { type: String, required: true, lowercase: true, unique: true },
            confirmed: {
                type: Boolean, required: true, default: false
            },
            confirmationToken: {
                type: String, required: false
            }
        });
        this._userModel = mongoose_1.default.model("User", userSchema);
        // this._userModel = this._mongooseInstance.model<UserModel>("user", userSchema);
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // throw new Error("Method not implemented.");
            n_defensive_1.given(user, "user")
                .ensureHasValue();
            let existingUser = yield this.get(user.id);
            if (existingUser) {
                let model = yield this._userModel.findOne({ id: user.id });
                model.email = user.email;
                model.passwordHash = user.passwordHash;
                model.username = user.name;
                model.confirmed = user.isConfirmedEmail;
                model.confirmationToken = user.confirmationToken;
                yield model.save();
            }
            else {
                yield this._userModel.create({
                    id: user.id,
                    email: user.email,
                    passwordHash: user.passwordHash,
                    username: user.name,
                    confirmed: user.isConfirmedEmail,
                    confirmationToken: user.confirmationToken
                });
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(id, "id")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            let userModel = yield this._userModel.findOne({ id: id });
            if (!userModel)
                return null;
            return this.modelToUser(userModel);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(email, "email")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            email = email.toLowerCase();
            let userModel = yield this._userModel.findOne({ email: email });
            if (!userModel)
                return null;
            return this.modelToUser(userModel);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            n_defensive_1.given(id, "id")
                .ensureHasValue()
                .ensureIsString()
                .ensure(t => !t.isEmptyOrWhiteSpace());
            let userModel = yield this._userModel.findOne({ id: id });
            if (userModel)
                yield userModel.remove();
        });
    }
    modelToUser(userModel) {
        let user = new user_1.User(userModel.id, userModel.username, userModel.email, userModel.confirmed, userModel.confirmationToken, userModel.passwordHash, []);
        return user;
    }
};
MongoUserRepository = __decorate([
    inject_1.inject("DbConnectionService"),
    __metadata("design:paramtypes", [Object])
], MongoUserRepository);
exports.MongoUserRepository = MongoUserRepository;
//# sourceMappingURL=mongo-user-repository.js.map