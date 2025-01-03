
//TODO analisar quando a API da limit
import {EtherscanRepository} from "../../repositories/EtherscanRepository";

export class FundedByService {
    constructor(private accountRepository: EtherscanRepository) {
    }

    async exec(address: string) {
        const firstTransaction = await this.accountRepository.txList(address, {
            offset: 1,
            page: 1,
            sort: 'asc'
        })

        const from = firstTransaction.result[0].from
        const value = firstTransaction.result[0].value
        const timestamp = firstTransaction.result[0].timeStamp

        return {from,value,timestamp}
    }

}