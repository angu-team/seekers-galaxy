import {CallBasicInfoTokenService} from "../../andromeda/ethers/CallBasicInfoTokenService";
import {FundedByService} from "../../etherscan/FundedByService";
import {ElasticRepository} from "../../../repositories/andromeda/ElasticRepository";
import {EthersRepository} from "../../../repositories/andromeda/EthersRepository";
import {Transaction} from "ethers";
import {HoneypotIsService} from "../../HoneypotIsService";
import {ContractVerifiedService} from "../../etherscan/ContractVerifiedService";
import {CallMaxBuyService} from "../../andromeda/ethers/CallMaxBuyService";
import {TelebotRepository} from "../../../repositories/TelebotRepository";
import {MessageBuilder} from "../../../MessageBuilder";
import {ByteUtils} from "../../../utils/ByteUtils";

interface IEvent{
    address:string,
    transaction:Transaction,
    user_id:number,
}

export class ListenContractEventsHandler {

    constructor(
        private honeypotIsService:HoneypotIsService,
        private contractVerifiedSourceService:ContractVerifiedService,
        private callMaxBuyService:CallMaxBuyService,
        private telebotRepository:TelebotRepository,
    ) {}

    validateAddress(address:string | null){
        if(!address) throw new Error("Invalid address");
    }

    async handle(event:IEvent){

        const simulation = await this.honeypotIsService.simulation(event.address);
        if(!simulation) return false;

        const verifiedSource = await this.contractVerifiedSourceService.exec(event.address)
        const maxBuy = await this.callMaxBuyService.exec(event.user_id,event.address)

        const messageBuilder = new MessageBuilder();
        messageBuilder.header = this.telebotRepository.cacheMessage[event.address].messageBuilder.header
        messageBuilder.middle = this.telebotRepository.cacheMessage[event.address].messageBuilder.middle

        messageBuilder.middle.checksumAndFundingAndSupplyAndMaxBuy = ByteUtils.composedKeccak256ToGetID([
            "0x12345678",
            messageBuilder.header.cex,
            messageBuilder.header.totalSupply,
            maxBuy || 0,
        ])
        messageBuilder.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGas = ByteUtils.composedKeccak256ToGetID([
            "0x12345678",
            messageBuilder.header.cex,
            messageBuilder.header.totalSupply,
            maxBuy || 0,
            simulation.buyGas
        ])
        messageBuilder.middle.checksumAndFundingAndSupplyAndMaxBuyAndSellGas = ByteUtils.composedKeccak256ToGetID([
            "0x12345678",
            messageBuilder.header.cex,
            messageBuilder.header.totalSupply,
            maxBuy || 0,
            simulation.sellGas
        ])

        messageBuilder.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGas = ByteUtils.composedKeccak256ToGetID([
            "0x12345678",
            messageBuilder.header.cex,
            messageBuilder.header.totalSupply,
            maxBuy || 0,
            simulation.buyGas,
            simulation.sellGas
        ])

        messageBuilder.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGasAndBuyTaxAndSellTaxAndTransferTax = ByteUtils.composedKeccak256ToGetID([
            "0x12345678",
            messageBuilder.header.cex,
            messageBuilder.header.totalSupply,
            maxBuy || 0,
            simulation.buyGas,
            simulation.sellGas,
            simulation.buyTax,
            simulation.sellTax,
            simulation.transferTax
        ])

       messageBuilder.setFooter({
            sellTax:simulation.sellTax,
            buyGas:simulation.buyGas,
            buyTax:simulation.buyTax,
            sellGas:simulation.sellGas,
            transferTax:simulation.transferTax,
            maxBuy: maxBuy || 0,
            verified:verifiedSource.verified,
            verfiedVersion:verifiedSource.compilerVersion
        })

        this.telebotRepository.updateMessage(event.user_id,messageBuilder,event.address);
    }

}