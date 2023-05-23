import ResponseBuilder from "../common/response.builder";
import { Utils } from "../common/utils";
import { ILoginRequest } from "../models/requests/login.request";
import { ILoginResponse } from "../models/responses/login.response";
import {UserRepository} from "../repositories/user.repository";
import { Inject } from "typescript-ioc";
import jwt from 'jsonwebtoken';
import { ISignupRequest } from "../models/requests/signup.request";
import { IUserToken } from "../models/user.token";

export class UserService {


    constructor(@Inject private userRepository: UserRepository, @Inject private responseBuilder: ResponseBuilder) {

    }


    async loginWithEmailPassword(request: ILoginRequest): Promise<any> {

        

        if (Utils.isNullOrEmpty(request.email)) {
            return this.responseBuilder.invalidInputResponse();
        }


        try {
            let userResponse = await this.userRepository.getUserWithEmailAndPassword(request.email,request.password);

            if (userResponse) {

                let tokenData:IUserToken={
                    id:userResponse._id,
                    email: userResponse.email,
                    type: userResponse.type
                };

                let userToken=jwt.sign(tokenData,process.env.JWT_SECRET || '',{expiresIn:'15d'});

                let loginResponse:ILoginResponse={
                    id:userResponse._id,
                    token: userToken,
                    email: userResponse.email,
                    company: userResponse.company,
                    firstName: userResponse.firstName,
                    lastName: userResponse.lastName,
                    type: userResponse.type,
                    plan: userResponse.plan,
                    created: userResponse.created,
                    updated: userResponse.updated
                }

                return this.responseBuilder.successResponse(loginResponse);
            } else {
                return this.responseBuilder.errorResponse("User not found");
            }

        } catch (error) {
            return this.responseBuilder.errorResponse(error);
        }

         
    }

   async signupWithEmail(request:ISignupRequest):Promise<any>{


        if(!Utils.isValidEmailAddress(request.email)){
            return this.responseBuilder.errorResponse("Invalid email address");
        }

        if(!Utils.isValidPassword(request.password)){
            return this.responseBuilder.errorResponse("Password should be at least 8 characters long");
        }

        try{

        let addUserResponse:any=await this.userRepository.addUserWithEmail(request.email,request.password,request.company);


            if(addUserResponse){

                let tokenData:IUserToken={
                    id: addUserResponse._id,
                    email: addUserResponse.email,
                    type: addUserResponse.type
                }
                let userToken=jwt.sign(tokenData,process.env.JWT_SECRET || '',{expiresIn:'15d'});

                let signupResponse:ILoginResponse={
                    id:addUserResponse._id,
                    token: userToken,
                    email: addUserResponse.email,
                    company: addUserResponse.company,
                    firstName: addUserResponse.firstName,
                    lastName: addUserResponse.lastName,
                    type: addUserResponse.type,
                    plan: addUserResponse.plan,
                    created: addUserResponse.created,
                    updated: addUserResponse.updated
                };

                return this.responseBuilder.successResponse(signupResponse);

            }else{

                return this.responseBuilder.errorResponse("Failed to create user");
            }


        }catch(error){
            return this.responseBuilder.errorResponse(error);
        }


    }

}