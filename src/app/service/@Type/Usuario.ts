interface Usuario{
    id_usuario: string;
    nome: string;
    numero_telefone: string;
    email: string;
    senha: string;
    tipo_usuario: "Ong" | "Cliente" | "Admin";
}