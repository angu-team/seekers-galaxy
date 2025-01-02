import {StringUtils} from "./utils/StringUtils";

interface IHeader {
    name:string,
    symbol:string,
    contract:string,
    dev:string,
    age:string,
    cex:string | null,
    totalSupply:number,
    decimals:number,
    balance:string
}

interface IMiddle {
    bytecode:string | null
    functions:any
}

interface IFooter {
    buyTax:number | null,
    sellTax:number | null,
    transferTax:number | null,
    buyGas:number | null,
    sellGas:number | null,
    maxTx:number | null,
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
        header += `└ Age: *${this.header.age}*\n`

        this.header.cex && (
            header += `└ From CEX: ${this.header.cex}\n`
        )

        header += `└ Balance: *${this.header.balance} ETH*\n`
        header += `Total Supply: *${this.header.totalSupply.toLocaleString("pt-BR")}*\n`
        header += `Decimals: ${this.header.decimals}\n`

        return StringUtils.escapeMarkdown(header);
    }

    formatMiddle(){
        let middle = ""
        // let directArrow = `[➥](${this.scan}token/${this.middle.tokenAddress})`
        // let directDexScreener = `[📉](${this.dexScreneer}${this.middle.tokenAddress})`
        //
        // middle += `Label: _${this.middle.caller}_\n`
        // middle += directArrow + "`" + this.middle.tokenAddress + "`" + directDexScreener + "\n"
        //
        return middle;
    }

    formatFooter(){
        let footer = ""
        //
        // if(this.footer.transferDelay) footer += `\nTransfer Delay: *${this.footer.transferDelay}*`
        // if(this.footer.maxTx) footer += `\nMax Tx: *${this.footer.maxTx}*`;
        // if(this.footer.maxWallet) footer += `\nMax Wallet: *${this.footer.maxWallet}*`
        //
        return footer;
    }

}