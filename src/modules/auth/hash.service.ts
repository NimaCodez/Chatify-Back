import { Injectable } from "@nestjs/common";
import { hash, compare, genSalt } from 'bcrypt';
import { bcryptConfig } from "src/config/env";

@Injectable()
export class HashService {
    async hash(password: string) {
        const salt = await genSalt(bcryptConfig.get('salt'))
        return await hash(password, salt);
    }

    async comparePasswords(password: string, hash: string) {
        return await compare(password, hash);
    }
}