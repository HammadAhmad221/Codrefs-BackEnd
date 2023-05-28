
import {Inject, Singleton} from 'typescript-ioc';
import { MongodbService } from '../../database/mongodb/mongodb.service';
import { UserModel } from '../../database/mongodb/schema/user';
import { ProjectModel } from '../../database/mongodb/schema/project';
import { User } from '../../entities/user';
import { Project } from '../../entities/project';
import { SubscriptionModel } from '../../database/mongodb/schema/subscription';
import { Subscription } from '../../entities/subscription';

@Singleton
export class DatabaseService{

  constructor(@Inject private mongodbService:MongodbService){}

   async connectToDB():Promise<void>{
        await this.mongodbService?.connect();
    } 

   async disconnectDB():Promise<void>{
    await this.mongodbService?.disconnect();
    
    }


    findUserWithEmail(email:string):Promise<any>{
      return new Promise(async (resolve,reject)=>{
        try{
        let response=await UserModel.findOne({email:email}).exec();
          
        resolve(response);

        }catch(error){
          reject(error);
        }
     
      });
    }
    findUserWithID(id:string):Promise<any>{
      return new Promise(async (resolve,reject)=>{
        try{
        let response=await UserModel.findOne({_id:id}).exec();
          
        resolve(response);

        }catch(error){
          reject(error);
        }
     
      });
    }

    createUser(user:User):Promise<any>{
      return new Promise(async(resolve,reject)=>{
        try{
        let response=await UserModel.create(user);
        resolve(response);
        }catch(error){
          reject(error);
        }
      })
    }
    createProject(project:Project):Promise<any>{
      return new Promise(async(resolve,reject)=>{
        try{
        let response=await ProjectModel.create(project);
        resolve(response);
        }catch(error){
          reject(error);
        }
      })
    }

     deleteProjectById(id: string): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          await ProjectModel.findByIdAndDelete(id).exec();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

    deleteUserById(id: string): Promise<void> {
      return new Promise(async (resolve, reject) => {
        try {
          await UserModel.findByIdAndDelete(id).exec();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }

    createEmailSubscription(subscription:Subscription):Promise<boolean>{
      return new Promise(async(resolve,reject)=>{
        try{
        let response=await SubscriptionModel.create(subscription);
        if(response){
          resolve(true);
        }
        }catch(error){
          reject(false);
        }
        resolve(false);
      })
    }
}
