import { Service } from "@angular/core";

export interface Animal {
    nome: string;
    idade: number;
    cidade: string;
    imagem: string;
    historia?: string;
    castrado?: boolean;
    vacinas?: string[];
    deficiencia?: string;
    peso?: number;
    ong?: string;
}
