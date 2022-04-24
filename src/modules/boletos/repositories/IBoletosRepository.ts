import { Boleto } from "../model/Boleto";

interface IBoletosRepositories {
    findByCodDigitavel(codboleto: string): Boleto;
}

export { IBoletosRepositories };