import {Singleton} from 'typescript-ioc';
@Singleton
export default class DatabaseService{

    testFunction():string{
        return "Message from test function service";
    } 
}