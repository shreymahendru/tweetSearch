"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_config_1 = require("n-config");
class DefaultConfigService {
    getEmailConfiguration() {
        let host = n_config_1.ConfigurationManager.getConfig("emailHost");
        let port = n_config_1.ConfigurationManager.getConfig("emailPort");
        let emailUser = n_config_1.ConfigurationManager.getConfig("emailUser");
        let emailPassword = n_config_1.ConfigurationManager.getConfig("emailPassword");
        let fromEmail = n_config_1.ConfigurationManager.getConfig("fromEmail");
        return {
            host: host,
            port: port,
            auth: {
                user: emailUser,
                pass: emailPassword
            },
            email: fromEmail
        };
    }
    getEmailTokenTTL() {
        let value = n_config_1.ConfigurationManager.getConfig("emailTokenTTL");
        return value;
    }
    getAuthTokenTTL() {
        let value = n_config_1.ConfigurationManager.getConfig("authTokenTTL");
        return value;
    }
    getJWTSecret() {
        let value = n_config_1.ConfigurationManager.getConfig("JWTSecret");
        return value;
    }
    getBaseUrl() {
        let value = n_config_1.ConfigurationManager.getConfig("baseUrl");
        return value;
    }
    getDbUrl() {
        let value = n_config_1.ConfigurationManager.getConfig("dbUrl");
        return value;
    }
}
exports.DefaultConfigService = DefaultConfigService;
//# sourceMappingURL=default-config-service.js.map