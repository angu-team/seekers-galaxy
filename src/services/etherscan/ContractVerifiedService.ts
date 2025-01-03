import {EtherscanRepository} from "../../repositories/EtherscanRepository";

interface IResponse {
    verified:boolean,
    compilerVersion:string,
}

export class ContractVerifiedService {
    constructor(private contractRepository:EtherscanRepository) {
    }

    async exec(address:string):Promise<IResponse>{
        const getSourceCode = await this.contractRepository.getSourceCode(address)
        const verified = getSourceCode.result[0].ABI !== 'Contract source code not verified'

        return {verified, compilerVersion:getSourceCode.result[0].CompilerVersion}
    }

}