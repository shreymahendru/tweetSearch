export interface TokenService
{
    generateEmailConfirmationToken(email: string): string;
    generateResetPasswordToken(id: string): string;
    verifyToken(token: string): boolean;
}