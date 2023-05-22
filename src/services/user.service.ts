import UserRepository from "../repositories/user.repository";
import { Inject } from "typescript-ioc";

export class UserService{

    @Inject
    private userRepository?:UserRepository;

    getUser(){
        return this.userRepository?.getUser();
    }

}