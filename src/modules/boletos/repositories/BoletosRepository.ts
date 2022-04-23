import { Boleto } from "../model/Boleto";


class BoletosRepository {
    private boletos: Boleto[];

    constructor() {
        this.boletos = [];
    }

    list():Boleto[]{
        return this.boletos;
    }

    findByCod(codboleto:string): Boleto{
        const boleto = this.boletos.find((boleto)=>boleto.cod === codboleto)
        return boleto;
    }
}

export {BoletosRepository};