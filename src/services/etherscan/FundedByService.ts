import {AccountRepository} from "../../repositories/etherscan/AccountRepository";

export class FundedByService {
    constructor(private accountRepository: AccountRepository) {
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