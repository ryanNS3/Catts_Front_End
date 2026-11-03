import { Service } from "@angular/core";

export interface Animal {
  id?: string;
  name: string;
  age: number;
  weight: number;
  description: string;
  adoptionStatus: boolean;
  castrado: boolean;
  vaccine?: string;
  ong?: {
    cnpj: string;
    nomeInstitucional: string;
    email: string;
    telefone: string;
    descricao: string;
  };
  image?: {
    linkId: string;
  };
}