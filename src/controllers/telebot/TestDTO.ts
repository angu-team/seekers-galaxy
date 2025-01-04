export type ParsedResult = {
    twitter: string | null;
    url: string | null;
    address: string | null;
};

export function parseInput(input: string): ParsedResult {
    // Quebramos o texto por espaços e consideramos até 3 partes
    const parts = input.split(" ");

    // Regex para identificar uma URL válida
    const urlRegex = /^(https?:\/\/[^\s]+)$/;

    // Regex para identificar o endereço (personalize se necessário para identificar padrões específicos como Solana)
    const addressRegex = /^[A-Za-z0-9]{32,44}$/;

    // Variáveis de destino
    let url: string | null = null;
    let address: string | null = null;
    let commonText: string | null = null;

    // Percorre as partes e identifica qual é o que
    for (const part of parts) {
        if (urlRegex.test(part)) {
            url = part; // Identifica como URL
        } else if (addressRegex.test(part)) {
            address = part; // Identifica como endereço
        } else {
            commonText = part; // Identifica como string comum
        }
    }

    // Retorna o resultado identificado, com valores ausentes como null
    return {
        twitter: commonText || null,
        url: url || null,
        address: address || null,
    };
}

// // Exemplo de uso
// const input =
//     "spucibymatt http://cyb3rgam3r420.xyz/ FEaCvDcvYmPpH1LFwoBt4xTgr6cDqHaaguPmKjy7pump";
//
// const result = parseInput(input);
// console.log(result);
// /**
//  * Resultado:
//  * {
//  *   commonText: "spucibymatt",
//  *   url: "http://cyb3rgam3r420.xyz/",
//  *   address: "FEaCvDcvYmPpH1LFwoBt4xTgr6cDqHaaguPmKjy7pump"
//  * }
//  */