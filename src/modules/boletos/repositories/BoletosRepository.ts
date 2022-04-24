import { Boleto } from "../model/Boleto";


class BoletosRepository {
    private boletos: Boleto[];

    constructor() {
        this.boletos = [];
    }

    list(): Boleto[] {
        return this.boletos;
    }

    findByCod(codboleto: string): boolean {

        if (codboleto.length != 47) {
            return false;  //verificador de posições codigo de barras
        }

        let campos = [
            {
                num: codboleto.substring(0, 9),
                DV: codboleto.substring(9, 10),
            },
            {
                num: codboleto.substring(10, 20),
                DV: codboleto.substring(20, 21),
            },
            {
                num: codboleto.substring(21, 31),
                DV: codboleto.substring(31, 32),
            },
        ];

        const validaCampos = campos.every(campo => this.modulo10(campo.num) === Number(campo.DV))

        return validaCampos;
    }

    modulo10(campo:string) {
        const cod = campo.split('').reverse();
        const soma = cod.reduce((acc, current, index) => {
            let soma = Number(current) * (((index + 1) % 2) + 1);
            soma = (soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma);
            return acc + soma;
        }, 0);
        return (Math.ceil(soma / 10) * 10) - soma;
    }

    modulo11Bancario(campo:string) {
        const cod = campo.split('').reverse();
        let multiplicador = 2;
        const soma = cod.reduce((acc, current) => {
          const soma = Number(current) * multiplicador;
          multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
          return acc + soma;
        }, 0);
        const restoDiv = soma % 11;
        const DV = 11 - restoDiv;
        if (DV === 0 || DV === 10 || DV === 11) return 1;
        return DV;
      }
}

export { BoletosRepository };