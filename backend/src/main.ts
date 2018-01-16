import { ComponentInstaller, Registry } from "n-ject";
import { ConfigurationManager } from "n-config";
import { WebApp } from "n-web";
import { DefaultConfigService } from "./services/config-service/default-config-service";
import { AppExceptionHandler } from "./exceptions/app-exception-handler";
import { ConsoleLogger } from "n-log/dist/console-logger";
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
            .registerSingleton("UserRepository", MongoUserRepository);
            // .registerSingleton()

    }
}

const controllers: Array<Function> = [LoginController, SignupController];

const app = new WebApp(ConfigurationManager.getConfig<number>("port"))
    .useInstaller(new Installer())
    .enableCors()
    .registerControllers(...controllers)
    .registerExceptionHandler(AppExceptionHandler);

app.bootstrap();