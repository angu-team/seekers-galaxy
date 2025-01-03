import {AccountRepository as EtherscanAccountRepository} from "../../repositories/etherscan/AccountRepository";
import {AccountRepository as BasescanAccountRepository} from "../../repositories/basescan/AccountRepository";

//TODO analisar quando a API da limit
export class FundedByService {
    constructor(private accountRepository: EtherscanAccountRepository | BasescanAccountRepository ) {
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