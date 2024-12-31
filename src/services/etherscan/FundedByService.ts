import {AccountRepository} from "../../repositories/etherscan/AccountRepository";

export class FundedByService {
    constructor(private accountRepository: AccountRepository) {
    }

    async exec(address: string) {
        const firstTransaction: { result: { from: string,value:string }[] } = await this.accountRepository.txList(address, {
            offset: 1,
            page: 1,
            sort: 'asc'
        })

        const from = firstTransaction.result[0].from
        const value = firstTransaction.result[0].value

        return {from,value}
    }

}