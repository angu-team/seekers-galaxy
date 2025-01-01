import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";

export class CallBasicInfoTokenService {
    private readonly functions = [
        "name","symbol","decimals","totalSupply"
    ]

    private readonly abi =         [
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    constructor(private repository:EthersRepository) {
    }

    async exec(userId:number,address:string){
        let abi = JSON.stringify(this.abi);
        let call:any = await this.repository.callFunctions(userId,address,this.functions,abi,true);

        return call;
    }

}