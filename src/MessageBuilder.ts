import {StringUtils} from "./utils/StringUtils";
import {ethers} from "ethers";

interface IHeader {
    name:string,
    symbol:string,
    contract:string,
    dev:string,
    age:string | null,
    cex:string | null,
    totalSupply:number,
    decimals:number,
    balance:string | null
}

interface IMiddle {
    checksum:string, //OK
    checksumAndFunding:string //OK
    checksumAndFundingAndSupply:string, //OK
    checksumAndFundingAndSupplyAndMaxBuy?:string, //OK
    checksumAndFundingAndSupplyAndMaxBuyAndBuyGas?:string, //OK
    checksumAndFundingAndSupplyAndMaxBuyAndSellGas?:string, //OK
    checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGas?:string, //OK
    checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGasAndBuyTaxAndSellTaxAndTransferTax?:string,
}

interface IFooter {
    buyTax:number ,
    sellTax:number ,
    transferTax:number ,
    buyGas:number ,
    sellGas:number,
    maxBuy:number,
    verified:boolean,
    verfiedVersion:string,
}

export class MessageBuilder {
    header!:IHeader;
    footer!:IFooter;
    middle!:IMiddle;

    setHeader(header:Partial<IHeader>){
        this.header = {...this.header, ...header}
    }

    setMiddle(middle:Partial<IMiddle>){
        this.middle = {...this.middle, ...middle}
    }

    setFooter(footer:Partial<IFooter>){
        this.footer = {...this.footer, ...footer}
    }

    getMessage(){
        let message = `\n<header/>\n<middle/>\n<footer/>\n`

        if(this.header){
            const headerFormat = this.formatHeader()
            message = message.replace("<header/>",`${headerFormat}`)
        }

        if(this.middle){
            const middleFormat = this.formatMiddle()
            message = message.replace("<middle/>",`${middleFormat}`)
        }

        if(this.footer){
            const footerFormat = this.formatFooter()
            message = message.replace("<footer/>",`${footerFormat}`)
        }

        return message.replaceAll(/<[^>]*\/>/g,"");
    }

    formatHeader(){
        let header = ""

        header += `Name: *${this.header.name}* | Symbol: *${this.header.symbol}*\n`
        header += `Contract: *${this.header.contract}*\n`
        header += `Dev: *${this.header.dev}*\n`

        if(this.header.age) {
            header += `└ Age: *${this.header.age}*\n`

            this.header.cex && (
                header += `└ From CEX: ${this.header.cex}\n`
            )
            const formatBalance = Number(this.header.balance)
            header += `└ Balance: *${formatBalance.toFixed(4)} ETH*\n`
        }

        const formatSupply = Number(ethers.formatUnits(this.header.totalSupply, Number(this.header.decimals)))

        header += `Total Supply: *${formatSupply.toLocaleString("pt-BR")}*\n`
        header += `Decimals: ${this.header.decimals}\n`

        return StringUtils.escapeMarkdown(header);
    }

    formatMiddle(){
        let middle = ""

        middle += `#${this.middle.checksum}\n`
        middle += `#${this.middle.checksumAndFunding}\n`
        middle += `#${this.middle.checksumAndFundingAndSupply}\n`

        this.middle.checksumAndFundingAndSupplyAndMaxBuy && (
            middle += `#${this.middle.checksumAndFundingAndSupplyAndMaxBuy}\n`
        )
        this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGas && (
            middle += `#${this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGas}\n`
        )
        this.middle.checksumAndFundingAndSupplyAndMaxBuyAndSellGas && (
            middle += `#${this.middle.checksumAndFundingAndSupplyAndMaxBuyAndSellGas}\n`
        )
        this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGas && (
            middle += `#${this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGas}\n`
        )
        this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGasAndBuyTaxAndSellTaxAndTransferTax && (
            middle += `#${this.middle.checksumAndFundingAndSupplyAndMaxBuyAndBuyGasAndSellGasAndBuyTaxAndSellTaxAndTransferTax}\n`
        )


        // middle += directArrow + "`" + this.middle.tokenAddress + "`" + directDexScreener + "\n"

        return StringUtils.escapeMarkdown(middle);
    }

    formatFooter(){
        let footer = "Tax:\n"

        footer += `└ Buy Tax: *${this.footer.buyTax.toFixed(2)}*% | Sell tax: *${this.footer.sellTax.toFixed(2)}*%\n`
        footer += `└ Transfer tax: *${this.footer.transferTax.toFixed(2)}*%\n`
        footer += `└ Buy Gas: #G_${this.footer.buyGas} | Sell Gas: #G_${this.footer.sellGas}\n`
        footer += `└ Max buy: *${this.footer.maxBuy}*\n`

        if(this.footer.verified){
            footer += `📄 Source Code Verified: ✅ *${this.footer.verfiedVersion}*\n`
        } else {
            footer += `📄 Source Code Verified: ✖\n`
        }

        return StringUtils.escapeMarkdown(footer);
    }

}