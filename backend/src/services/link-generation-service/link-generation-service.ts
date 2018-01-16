import { User } from "../../domain/models/user";

export interface LinkGenerationService
{
    generateResetPasswordLink(user: User): string;
    generateEmailConfirmationLink(user: User): string;
}