import { User } from "../../domain/models/user";

export interface MailerService
{
    sendEmailConfirmationEmail(user: User): void;
    sendResetPasswordEmail(user: User): void;
}

export interface EmailConfiguartion
{
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    }
    email: string;
}