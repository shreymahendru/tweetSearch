import { User } from "../../domain/models/user";

export interface TokenService
{
    generateEmailConfirmationToken(email: string): string;
    generateResetPasswordToken(id: string): string;
    verifyToken(token: string): boolean;
    decodeToken<T>(token: string): T;
    generateAuthToken(user: User): string;
}