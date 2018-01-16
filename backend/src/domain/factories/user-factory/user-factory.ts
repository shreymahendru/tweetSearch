import { User } from "../../models/user";

export interface UserFactory
{
    create(email: string, username: string, password: string): Promise<User>;
}