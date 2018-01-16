"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const n_config_1 = require("n-config");
const n_web_1 = require("n-web");
const default_config_service_1 = require("./services/config-service/default-config-service");
const app_exception_handler_1 = require("./exceptions/app-exception-handler");
const console_logger_service_1 = require("./services/logger-service/console-logger-service");
const bcrypt_hashing_service_1 = require("./services/hashing-service/bcrypt-hashing-service");
const default_user_factory_1 = require("./domain/factories/user-factory/default-user-factory");
const default_search_term_factory_1 = require("./domain/factories/search-term-factory/default-search-term-factory");
const defualt_token_service_1 = require("./services/token-service/defualt-token-service");
const default_link_geneartion_service_1 = require("./services/link-generation-service/default-link-geneartion-service");
const dev_mailer_service_1 = require("./services/mailer-service/dev-mailer-service");
const mongo_connection_service_1 = require("./services/db-connection-service/mongo-connection-service");
const mongo_user_repository_1 = require("./domain/repositories/user-repository/mongo-user-repository");
const login_controller_1 = require("./controllers/user/login-controller");
const signup_controller_1 = require("./controllers/user/signup-controller");
class Installer {
    install(registry) {
        const isDev = n_config_1.ConfigurationManager.getConfig("mode") === "dev";
        registry
            .registerSingleton("ConfigService", isDev ? default_config_service_1.DefaultConfigService : null)
            .registerSingleton("Logger", console_logger_service_1.ConsoleLogger)
            .registerSingleton("HashingService", bcrypt_hashing_service_1.BcryptHashingService)
            .registerSingleton("TokenService", defualt_token_service_1.DefaultTokenService)
            .registerSingleton("LinkGenerationService", default_link_geneartion_service_1.DefaultLinkGenerationService)
            .registerSingleton("DbConnectionService", mongo_connection_service_1.MongoConnectionService)
            .registerSingleton("MailerService", isDev ? dev_mailer_service_1.DevMailerService : null)
            .registerSingleton("UserFactory", default_user_factory_1.DefaultUserFactory)
            .registerSingleton("SearchTermFactory", default_search_term_factory_1.DefaultSearchTermFactory)
            .registerSingleton("UserRepository", mongo_user_repository_1.MongoUserRepository);
        // .registerSingleton()
    }
}
const controllers = [login_controller_1.LoginController, signup_controller_1.SignupController];
const app = new n_web_1.WebApp(n_config_1.ConfigurationManager.getConfig("port"))
    .useInstaller(new Installer())
    .enableCors()
    .registerControllers(...controllers)
    .registerExceptionHandler(app_exception_handler_1.AppExceptionHandler);
app.bootstrap();
//# sourceMappingURL=main.js.map