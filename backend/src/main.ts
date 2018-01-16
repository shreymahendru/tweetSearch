import { ComponentInstaller, Registry } from "n-ject";
import { ConfigurationManager } from "n-config";
import { WebApp } from "n-web";
import { DefaultConfigService } from "./services/config-service/default-config-service";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";
import { ConsoleLogger } from "./services/logger-service/console-logger-service";
import { BcryptHashingService } from "./services/hashing-service/bcrypt-hashing-service";
import { DefaultUserFactory } from "./domain/factories/user-factory/default-user-factory";
import { DefaultSearchTermFactory } from "./domain/factories/search-term-factory/default-search-term-factory";
import { DefaultTokenService } from "./services/token-service/defualt-token-service";
import { DefaultLinkGenerationService } from "./services/link-generation-service/default-link-geneartion-service";
import { DevMailerService } from "./services/mailer-service/dev-mailer-service";
import { MongoConnectionService } from "./services/db-connection-service/mongo-connection-service";
import { MongoUserRepository } from "./domain/repositories/user-repository/mongo-user-repository";
import { LoginController } from "./controllers/user/login-controller";
import { SignupController } from "./controllers/user/signup-controller";
import { MongoSearchTermRepository } from "./domain/repositories/search-term-repository/mongo-search-term-repository";
import { ConfirmEmailController } from "./controllers/auth/confirm-email-controller";
import { ResetPasswordController } from "./controllers/auth/reset-password-controller";
import { ResetPasswordRequestController } from "./controllers/auth/reset-password-request-controller";
import { ValidateTokenController } from "./controllers/auth/vaildate-token-controller";
import { SearchTweetController } from "./controllers/tweeter-search/search-tweet-controller";
import { DefaultTwitterService } from "./services/twitter-service/default-twitter-service" ;

class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        const isDev = ConfigurationManager.getConfig<string>("mode") === "dev";

        registry
            .registerSingleton("ConfigService", isDev ? DefaultConfigService : null)
            .registerSingleton("Logger", ConsoleLogger)
            .registerSingleton("HashingService", BcryptHashingService)
            .registerSingleton("TokenService", DefaultTokenService)
            .registerSingleton("LinkGenerationService", DefaultLinkGenerationService)
            .registerSingleton("DbConnectionService", MongoConnectionService)
            .registerSingleton("MailerService", isDev ? DevMailerService : null)
            .registerSingleton("UserFactory", DefaultUserFactory)
            .registerSingleton("SearchTermFactory", DefaultSearchTermFactory)
            .registerSingleton("UserRepository", MongoUserRepository)
            .registerSingleton("SearchTermRepository", MongoSearchTermRepository)
            .registerSingleton("TwitterService", DefaultTwitterService);
            // .registerSingleton()

    }
}

const controllers: Array<Function> = [LoginController, SignupController,
    ConfirmEmailController, ResetPasswordController,
    ResetPasswordRequestController, ValidateTokenController, SearchTweetController];

const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .useInstaller(new Installer())
    .enableCors()
    .registerControllers(...controllers)
    .registerExceptionHandler(AppExceptionHandler);

app.bootstrap();