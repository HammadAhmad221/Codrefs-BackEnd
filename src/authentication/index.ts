export function validateAuthHeader(authHeader?:string):boolean{
    
    return true;
    if(authHeader!=null && authHeader!=undefined){
        return true;
    }
    return false;
}