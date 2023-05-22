export class Utils{

    static isValidEmailAddress(input:string):boolean{

       const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input);

    }

    static isValidPassword(input:string):boolean{

        if(input && input.length>=8){
            return true;
        }
         
        return false;
     }

     static isNullOrEmpty(value: any): boolean {
        return value === null || value === '' || value === undefined;
      }

}