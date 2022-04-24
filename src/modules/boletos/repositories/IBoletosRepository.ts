import { Boleto } from "../model/Boleto";

interface IBoletosRepositories {
    findByCodDigitavel(codboleto: string): Boleto;
    list(): Boleto[];
}

export { IBoletosRepositories };