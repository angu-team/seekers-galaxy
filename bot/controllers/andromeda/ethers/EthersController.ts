import {EthersRepository} from "../../../../src/repositories/andromeda/EthersRepository";
import {TelebotRouter3} from "../../TelebotRouter3";

export class EthersController {
    private static repository: EthersRepository;

    constructor(ethersRepository:EthersRepository) {
        EthersController.repository = ethersRepository;
    }

    @TelebotRouter3.ReceiveMessage("applyRpc","literal")
    applyRpcCtrl(userId: number,command:string, args: string){
        return EthersController.repository.applyRpc(userId,args);
    }
}