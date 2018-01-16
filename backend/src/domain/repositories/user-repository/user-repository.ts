import { User } from "../../models/user";

export interface UserRepository
{
    save(user: User): Promise<void>;
    getAll(): Promise<Array<User>>;
    get(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    delete(id: string): Promise<void>;
}