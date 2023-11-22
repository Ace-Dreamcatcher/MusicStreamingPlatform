import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signup() {
        return {
            msg: "I am big"
        };
    }

    signin() {
        return "I am small";
    }
}
