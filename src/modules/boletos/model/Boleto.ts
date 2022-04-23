import { v4 as uuidV4} from "uuid";

class Boleto {
    id:string;
    cod:string;

    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }
    }
}

export {Boleto};