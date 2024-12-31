import {ContractRepository} from "../../repositories/etherscan/ContractRepository";

export class ContractVerifiedService {
    constructor(private contractRepository:ContractRepository) {
    }

    async exec(address:string){
        const getAbi = await this.contractRepository.getAbi(address)
        const isNotVerified = getAbi.result === "Contract source code not verified";

        return !isNotVerified
    }

}