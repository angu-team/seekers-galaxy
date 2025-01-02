import {AccountRepository} from "../../../repositories/etherscan/AccountRepository";

export class EtherscanController {
    private readonly accountRepository:AccountRepository;

    constructor(accountRepository:AccountRepository) {
        this.accountRepository = accountRepository;
    }
}