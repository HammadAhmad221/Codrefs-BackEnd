import {Singleton} from 'typescript-ioc';

//pure
@Singleton
export default class DatabaseService{
//pureend



    //pure
    testFunction():string{
        return "Message from test function service";
    } 
}
//pureend