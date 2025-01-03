import {ContractRepository as EtherscanContractRepository} from "../../repositories/etherscan/ContractRepository" ;
import {ContractRepository as BasescanContractRepository} from "../../repositories/basescan/ContractRepository" ;

interface IResponse {
    verified:boolean,
    compilerVersion:string,
}

export class ContractVerifiedService {
    constructor(private contractRepository:EtherscanContractRepository | BasescanContractRepository) {
    }

    async exec(address:string){
        const getSourceCode = await this.contractRepository.getSourceCode(address)
        const verified = getSourceCode.result[0].ABI !== 'Contract source code not verified'

        return {verified, compilerVersion:getSourceCode.result[0].CompilerVersion}
    }

}