import {CallBasicInfoTokenService} from "../../andromeda/ethers/CallBasicInfoTokenService";
import {FundedByService} from "../../etherscan/FundedByService";
import {ElasticRepository} from "../../../repositories/andromeda/ElasticRepository";
import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {ethers, TransactionReceipt} from "ethers";
import {TelebotRepository} from "../../../repositories/TelebotRepository";
import {MessageBuilder} from "../../../MessageBuilder";
import {DateUtils} from "../../../utils/DateUtils";

export class ListenDeployErc20Handler {

    transferSignature = "Transfer(address,address,uint256)";

    constructor(
        private callBasicInfoTokenService: CallBasicInfoTokenService,
        private fundedByService: FundedByService,
        private elasticRepository: ElasticRepository,
        private ethersRepository: EthersRepository,
        private telebotRepository: TelebotRepository,
    ) {
    }

    async handle(userId: number, transaction: TransactionReceipt[]) {
        transaction.map(async (transaction) => {
            const basicInfoToken = await this.callBasicInfoTokenService.exec(797182203, transaction.contractAddress!)
            if(!basicInfoToken.totalSupply || basicInfoToken.totalSupply == "0") return false

            const devInfo = await this.getDevInfo(transaction.from);
            const messageBuilder = this.buildMessage(transaction, basicInfoToken, devInfo);

            this.telebotRepository.sendMessage(userId, messageBuilder, transaction.contractAddress!);
            await this.ethersRepository.listenContractEvents(797182203,"http://localhost:8081/",transaction.contractAddress!,this.transferSignature)// console.log(basicInfoToken);
        })
    }

    private buildMessage(transaction: TransactionReceipt, basicInfoToken: any, devInfo: any) {
        const messageBuilder = new MessageBuilder();

        messageBuilder.setHeader({
            name: basicInfoToken.name,
            symbol: basicInfoToken.symbol,
            decimals: basicInfoToken.decimals,
            totalSupply: Number(
                ethers.formatUnits(basicInfoToken.totalSupply, Number(basicInfoToken.decimals))
            ),
            dev: transaction.from,
            cex: devInfo.label,
            contract: transaction.contractAddress!,
            age: DateUtils.formatTimestamp(devInfo.fundedBy.timestamp),
            balance: ethers.formatEther(devInfo.fundedBy.value),
        });

        return messageBuilder
    }

    private async getDevInfo(devAddress: string) {
        const fundedBy = await this.fundedByService.exec(devAddress);

        const labelToFundedBy = await this.elasticRepository.getLabelByAddress(fundedBy.from).catch(() => {});

        return {
            address: devAddress,
            fundedBy,
            label: labelToFundedBy ? labelToFundedBy.label : "Unknown",
        };
    }

}