import {ethers} from "ethers";

export class ByteUtils {

    /**
     * Combina múltiplos itens em um único hash Keccak256.
     *
     * Esta função percorre uma lista de itens, convertendo cada um em bytes e combinando-o de forma sequencial
     * com o hash acumulado até o momento. O hash inicial é definido como "ZeroHash" (32 bytes de zeros) e
     * em cada iteração o hash é atualizado usando a função keccak256 da biblioteca ethers.js.
     *
     * @param items - Array de itens a serem combinados. Cada item será serializado em formato UTF-8 e concatenado com o hash acumulado.
     * @returns O hash Keccak256 final como uma string hexadecimal (com prefixo "0x").
     *
     * @example
     * const items = ["Alice", "Bob", "Charlie"];
     * const hash = composedKeccak256(items);
     * console.log(hash); // Exemplo de saída: "0xabc123..."
     */
    public static composedKeccak256ToGetID(items: any[]): string {
        let keccak = ethers.ZeroHash;

        items.forEach(item => {
            const concatenated = ethers.toUtf8Bytes(`${item}${keccak}`);
            keccak = ethers.keccak256(concatenated);
        });

        return keccak.substring(0,10); // Retorna o hash final
    }

}