
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

        const transaction = firstTransaction.result[0]
        if(!transaction) return false;

        const from = transaction.from
        const value = transaction.value
        const timestamp = transaction.timeStamp

        return {from,value,timestamp}
    }

}