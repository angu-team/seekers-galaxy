import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {TelebotServer} from "../../TelebotServer";

export class EthersController {
    private static repository: EthersRepository;

    constructor(ethersRepository:EthersRepository) {
        EthersController.repository = ethersRepository;
    }

    @TelebotServer.ReceiveMessage("applyRpc","literal")
    applyRpcCtrl(userId: number,command:string, args: string){
        return EthersController.repository.applyRpc(userId,args);
    }
}