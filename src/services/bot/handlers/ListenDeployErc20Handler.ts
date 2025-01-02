import {CallBasicInfoTokenService} from "../../andromeda/ethers/CallBasicInfoTokenService";
import {FundedByService} from "../../etherscan/FundedByService";
import {ElasticRepository} from "../../../repositories/andromeda/ElasticRepository";
import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {TransactionReceipt} from "ethers";

export class ListenDeployErc20Handler {

    transferSignature = "Transfer(address,address,uint256)";

    constructor(
        private callBasicInfoTokenService:CallBasicInfoTokenService,
        private fundedByService:FundedByService,
        private elasticRepository:ElasticRepository,
        private ethersRepository:EthersRepository,
    ) {}

    validateAddress(address:string | null){
        if(!address) throw new Error("Invalid address");
    }

    async listenDeployErc20Handler(userId:number,transaction:TransactionReceipt[]){
        transaction.map(async (transaction) => {
            const basicInfoToken = await this.callBasicInfoTokenService.exec(666,transaction.contractAddress!)

            const dev_fundedBy = await this.fundedByService.exec(transaction.from);
            const labelToFundedBy = await this.elasticRepository.getLabelByAddress(dev_fundedBy.from)

            await this.ethersRepository.listenContractEvents(666,"http://localhost:8081/",transaction.contractAddress!,this.transferSignature)// console.log(basicInfoToken);
        })

    }
}