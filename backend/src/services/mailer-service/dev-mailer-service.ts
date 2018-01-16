import { MailerService, EmailConfiguartion } from "./mailer-service";
import { User } from "../../domain/models/user";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "../config-service/config-service";
import { inject } from "n-ject";
import { given } from "n-defensive";
import { LinkGenerationService } from "../link-generation-service/link-generation-service";

@inject("ConfigService", "LinkGenerationService")
export class DevMailerService implements MailerService
{
    private readonly _transport: any;
    private readonly _configService: ConfigService;
    private readonly _emailConfig: EmailConfiguartion;
    private readonly _linkGenerationService: LinkGenerationService;
    
    public constructor(configService: ConfigService, linkGenerationService: LinkGenerationService)
    {
        given(configService, "configService")
            .ensureHasValue();
        given(linkGenerationService, "linkGenerationService")
            .ensureHasValue();
        
        this._configService = configService;
        this._linkGenerationService = linkGenerationService;
        
        this._emailConfig = this._configService.getEmailConfiguration();
        
        this._transport = nodemailer.createTransport({
            host: this._emailConfig.host,
            port: this._emailConfig.port,
            secure: false, // true for 465, false for other ports
            auth: {
                user: this._emailConfig.auth.user, 
                pass: this._emailConfig.auth.pass 
            }
        });
    }
    
    public sendEmailConfirmationEmail(user: User): void
    {
        given(user, "user")
            .ensureHasValue();
        
        const email = {
            from: this._emailConfig.email,
            to: user.email,
            text: `
            Welcome to tweetSearch. Please confirm your email
            
            ${this._linkGenerationService.generateEmailConfirmationLink(user)}
        `
        }
        this._transport.sendMail(email);
    }
    
    public sendResetPasswordEmail(user: User): void 
    {
        given(user, "user")
            .ensureHasValue();
        
        const email = {
            from: this._emailConfig.email,
            to: user.email,
            text: `
            To Reset password click on the link below.
            
            ${this._linkGenerationService.generateResetPasswordLink(user)}
        `    
        }
        this._transport.sendMail(email);
    }
    
}