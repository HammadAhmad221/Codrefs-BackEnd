
import { Inject } from "typescript-ioc";
import ResponseBuilder from "../common/response.builder";

export default class UserRepository{

    constructor(@Inject private responseBuilder:ResponseBuilder){

    }
    getUser() {
        return this.responseBuilder.successResponse();
    }

}
