import {CallBasicInfoTokenService} from "../../andromeda/ethers/CallBasicInfoTokenService";
import {FundedByService} from "../../etherscan/FundedByService";
import {ElasticRepository} from "../../../repositories/andromeda/ElasticRepository";
import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";

export class ListenContractEventsHandler {

    constructor(
        private callBasicInfoTokenService:CallBasicInfoTokenService,
        private fundedByService:FundedByService,
        private elasticRepository:ElasticRepository,
        private ethersRepository:EthersRepository,
    ) {}

    validateAddress(address:string | null){
        if(!address) throw new Error("Invalid address");
    }

}