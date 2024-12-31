import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";

export class CallMaxBuyService {
    private readonly functions = [
        "_maxTxAmount",
        "_maxTxSwap",
        "maxTxSwap",
        "maxTxAmount",
        "maxTx",
        "maxTransactionAmount",
        "maxTxnSize",
        "maxHoldings",
        "maxSwapAmount"
    ]
    private readonly abi = [
        {"inputs":[],"name":"maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"_maxTxAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},

        {"inputs":[],"name":"_maxTxSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"maxTxSwap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},

        {"inputs":[],"name":"maxTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"_maxTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},

        {"inputs":[],"name":"maxTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
        {"inputs":[],"name":"_maxTx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},

        {"inputs":[],"name":"maxTxnSize","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    ]

    constructor(private repository:EthersRepository) {
    }

    async exec(userId:number,address:string){
        let abi = JSON.stringify(this.abi);
        let call = await this.repository.callFunctions(userId,address,this.functions,abi);

        return this.getFirstKeyOrNull(call);
    }

    private getFirstKeyOrNull(obj: Record<string, any>): string | null {
        const keys = Object.keys(obj);
        return keys.length > 0 ? keys[0] : null;
    }

}