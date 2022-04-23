import { Boleto } from "../model/Boleto";


class BoletosRepository {
    private boletos: Boleto[];

    constructor() {
        this.boletos = [];
    }

    list(): Boleto[] {
        return this.boletos;
    }

    findByCod(codboleto: string): string {
        const boleto = codboleto;

        if (codboleto.length != 44) {
            return null;  //verificador de posições codigo de barras
        }

        const campo1 = codboleto.substring(0, 4) + codboleto.substring(19, 20) + "." + codboleto.substring(20, 24);
        const campo2 = codboleto.substring(24, 29) + "." + codboleto.substring(29, 34);
        const campo3 = codboleto.substring(34, 39) + "." + codboleto.substring(39, 44);
        const campo4 = codboleto.substring(4, 5);  // Digito verificador
        const campo5 = codboleto.substring(5, 19); // Fator de vencimento e valor


        return boleto;
    }

    modulo10(cod: string) {
        cod = cod.replace("[^0-9]", "");

        let soma = 0;
        let peso = 0;

        let cont = cod.length - 1;

        let multiplicacao = 0;

        while (cont >= 0) {
            multiplicacao = parseInt(cod.substring(cont, cont + 1)) * peso;

            if (multiplicacao >= 10) {
                multiplicacao = 1 + (multiplicacao - 10);
            }

            soma = soma + multiplicacao;

            if (peso == 2) {
                peso = 1;
            } else {
                peso = 2;
            }

            cont = cont - 1;
        }

        let digito = 10 - (soma % 10);

        if (digito == 10) {
            digito = 10;
        }

        return digito;
    }
}

export { BoletosRepository };