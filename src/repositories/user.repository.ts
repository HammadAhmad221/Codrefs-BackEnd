
import { PLANS, USER_TYPES } from "../constants/constants";
import { User } from "../entities/user";
import bcrypt from 'bcrypt';
import { DatabaseService } from "../common/services/database.service";
import { Inject } from "typescript-ioc";

export class UserRepository{

    
    constructor(@Inject private databaseService:DatabaseService){}


    getUserWithEmailAndPassword(email:string,password:string):Promise<any>{
        return new Promise(async (resolve,reject)=>{

            let user=await this.databaseService?.findUserWithEmail(email);

            if(user){
                const passwordMatch =await bcrypt.compare(password, user.password);

                if(passwordMatch){
                    resolve(user);
                }else{
                    reject("Password does not match");
                }
            }
            reject("User with this email does not exist");
        });
    }


    addUserWithEmail(email:string,password:string,company:string):Promise<any>{
        return new Promise(async (resolve,reject)=>{

            let userModel={
                
                email: email,
                company: company,
                firstName: "",
                lastName: "",
                password:password,
                type: USER_TYPES.ADMIN,
                author:null,
                plan: PLANS.BASIC,
                created: new Date(),
                updated: new Date()
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            let user=new User({...userModel,password:hashedPassword});

            try{
            let createdUser=await this.databaseService.createUser(user);

                resolve(createdUser);

            }catch(error){
                console.log("Create model error:",error);
                if(error.hasOwnProperty("code") && error.code==11000){
                    reject("User already exists with this email");
                }else{
                    reject("Could not create user");
                }
            }

        });
    }
}
