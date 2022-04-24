import { Boleto } from "../model/Boleto";

interface responseFindByCod {
    valido: boolean;
    infoBoleto: Boleto;
}

class BoletosRepository {

    findByCodDigitavel(codboleto: string): responseFindByCod {

        if (codboleto.length != 47 && codboleto.length != 48) {

            return {
                valido: false,
                infoBoleto: {
                    barCode: null,
                    amount: null,
                    expirationDate: null
                }
            };  //verificador de posições codigo de barras
        } else if (codboleto.length == 47) {
            return this.linhaDigitavelBancaria(codboleto);
        } else if (codboleto.length == 48) {
            return this.linhaDigitavelConcessionaria(codboleto);
        }
    }

    linhaDigitavelBancaria(codboleto: string): responseFindByCod {
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

        let vencimento = codboleto.substring(33, 37);

        let date = new Date('10/07/1997');

        date.setTime(date.getTime() + (Number(vencimento) * 24 * 60 * 60 * 1000))

        vencimento = (date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + (date.getDate()))


        let valor: number;

        valor = Number(Number(codboleto.substring(37, 47)).toFixed(2)) / 100;

        let barCode = this.calculaBarraBancario(codboleto);

        return {
            valido: validaCampos,
            infoBoleto: {
                barCode: barCode,
                amount: valor,
                expirationDate: vencimento
            }
        };
    }

    modulo10(campo: string) {
        const cod = campo.split('').reverse();
        const soma = cod.reduce((acc, current, index) => {
            let soma = Number(current) * (((index + 1) % 2) + 1);
            soma = (soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma);
            return acc + soma;
        }, 0);
        return (Math.ceil(soma / 10) * 10) - soma;
    }

    modulo11Bancario(campo: string) {
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

    calculaBarraBancario(codboleto:string) {

        let barCode = '';

        barCode += codboleto.substring(0, 3); // Identificação do banco
        barCode += codboleto.substring(3, 4); // Código da moeda
        barCode += codboleto.substring(32, 33); // DV
        barCode += codboleto.substring(33, 37); // Fator Vencimento
        barCode += codboleto.substring(37, 47); // Valor nominal
        barCode += codboleto.substring(4, 9); // Campo Livre Bloco 1
        barCode += codboleto.substring(10, 20); // Campo Livre Bloco 2
        barCode += codboleto.substring(21, 31); // Campo Livre Bloco 3

        return barCode;
    }

    linhaDigitavelConcessionaria(codboleto: string): responseFindByCod {

        const codMoeda = Number(codboleto[2]);

        let modulo: any;

        if (codMoeda === 6 || codMoeda === 7) {
            modulo = this.modulo10;
        } else if (codMoeda === 8 || codMoeda === 9) {
            modulo = this.modulo11Arrecadacao;
        } else {
            return {
                valido: false,
                infoBoleto: {
                    barCode: null,
                    amount: null,
                    expirationDate: null
                }
            };
        }

        const campos = Array.from({ length:4}, (v,index)=>{
            const start = (11 * (index)) + index;
            const end = (11 * (index + 1)) + index;
            return {
              num: codboleto.substring(start, end),
              DV: codboleto.substring(end, end + 1),
            };
        });

        const validaCampos = campos.every(campo => modulo(campo.num) === Number(campo.DV))

        let barCode = this.calculaBarraConcessionaria(codboleto) ;

        let valor: number;
      
        valor = Number(Number(barCode.substring(4, 15)).toFixed(2)) / 100;

        let vencimento = codboleto.substring(21, 27);

        let date = new Date('10/07/1997');

        date.setTime(date.getTime() + (Number(vencimento) * 24 * 60 * 60 * 1000))

        vencimento = (date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' +"0"+ (date.getDate()))

        return {
            valido: validaCampos,
            infoBoleto: {
                barCode: barCode,
                amount: valor,
                expirationDate: vencimento
            }
        };
    }

    modulo11Arrecadacao(campo: string) {
        const cod = campo.split('').reverse();
        let multiplicador = 2;
        const soma = cod.reduce((acc, current) => {
            const soma = Number(current) * multiplicador;
            multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
            return acc + soma;
        }, 0);
        const restoDiv = soma % 11;

        if (restoDiv === 0 || restoDiv === 1) {
            return 0;
        }
        if (restoDiv === 10) {
            return 1;
        }
        const DV = 11 - restoDiv;
        return DV;
    }

    calculaBarraConcessionaria(codboleto: string) {

        let barCode = '';

        for (let index = 0; index < 4; index++) {
          const start = (11 * (index)) + index;
          const end = (11 * (index + 1)) + index;
          barCode += codboleto.substring(start, end);
        }
        return barCode;
    }

}

export { BoletosRepository };