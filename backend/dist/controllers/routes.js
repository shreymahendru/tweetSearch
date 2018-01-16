"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const version = "/api/v1/";
// User Routes
exports.loginUser = version + "login";
exports.signupUser = version + "signup";
// auth
exports.confirmEmail = version + "confirmation_email/{token: string}";
exports.validateToken = version + "validate_token";
exports.resetPasswordRequest = version + "reset_password_request";
exports.resetPassword = version + "reset_password/{token: string}";
// tweeter Search
exports.search = version + "tweet/search?{$search: string}";
exports.nMostSearched = version + "tweet/most_searched?{$count: number}";
exports.userSearchHistory = version + "tweet/search_history?{$user_id: string}";
//# sourceMappingURL=routes.js.map