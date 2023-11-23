import { Produto } from "./produto";

export class Pedido {
    id!: number;
    obs!: string;
    produtos!: Produto[];
}
